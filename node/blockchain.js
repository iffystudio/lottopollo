var _         = require( 'underscore' ),
    async     = require( 'async' ),
    mysql     = require( 'mysql' ),
    web3      = require( 'web3' ),

    count     = 0,
    db        = mysql.createConnection( { host: 'localhost', user: 'content', password: 'content', database: 'lottopollo' } ),
    eth       = web3.eth,
    lotteries = { },

    fromBlock;


db.connect();
web3.setProvider( new web3.providers.HttpProvider( 'http://localhost:8545' ) );


async.series( [

  function ( cb ) {
    db.query( 'SELECT * FROM t_item WHERE item_type_id = 16', function ( err, rows ) {
      if ( err ) throw err;

      count     = rows.length;

      _.each( rows, function ( elem ) {
        lotteries[ elem.id ] = _.clone( elem );
        } );

      cb(); } );
    },


  function ( cb ) {
    db.query( 'SELECT * FROM t_log ORDER BY c_block_number DESC LIMIT 1', function ( err, rows ) {
      if ( err ) throw err;

      fromBlock = ( rows.length && ( rows[ 0 ].c_block_number > 15 ) ) ? ( rows[ 0 ].c_block_number - 15 ) : 0;

      cb(); } );
    },


  function ( cb ) {
    db.query( 'DELETE FROM t_log WHERE c_block_number >= ?', [ fromBlock ], function ( err ) {
      if ( err ) throw err;

      cb(); } );
    },


  function ( cb ) {
    _.each( lotteries, function ( elem ) {
      db.query( 'UPDATE t_item SET c_balance = ? WHERE id = ?', [ eth.getBalance( elem.c_address ).toFixed(), elem.id ] );

      var log = eth.contract(
          [ { inputs: [ ], type: 'constructor' }, { anonymous: false, inputs: [ { indexed: false, name: 'status', type: 'uint256' } ], name: 'log', type: 'event' } ]
          ).at( elem.c_address ).log( { }, { fromBlock: fromBlock, toBlock: eth.blockNumber } );

      setTimeout( function () { log.get( function ( error, result ) { events( error, result, elem.c_address, elem.id ); } ); }, 5000 );
      } );
    }

  ] );


function event( result, address, lotteryID ) {
  var balance     = eth.getBalance( address, result.blockNumber ).toFixed(),
      txn         = eth.getTransaction( result.transactionHash ),

      block       = eth.getBlock( result.blockNumber ),
      eventID     = result.args.status.toFixed(),
      insert      = {
                      c_address:      txn.from,
                      c_balance:      balance,
                      c_block_number: result.blockNumber,
                      c_event_id:     eventID,
                      c_timestamp:    block.timestamp,
                      c_txn_hash:     result.transactionHash,
                      c_txn_idx:      result.transactionIndex,
                      lottery_id:     lotteryID
                      },
      prevBalance = eth.getBalance( address, result.blockNumber - 1 ).toFixed();

  if ( eventID == 4 ) {
    insert.c_address  = '0x' + eth.getStorageAt( lotteries[ lotteryID ].c_address, 0 ).slice( -40 );
    insert.c_value    = prevBalance;
    }
  else {
    insert.c_value = txn.value.toFixed();
    }

  if ( eventID != 5 ) {
    db.query( 'INSERT INTO t_log SET ?', insert ); 
    }

  if ( eventID == 2 ) {
    if ( ! lotteries[ lotteryID ].updated ) {
      db.query( 'UPDATE t_item SET c_participant = ?, c_timestamp = ? WHERE id = ?', [ txn.from, block.timestamp, lotteryID ] );

      lotteries[ lotteryID ].updated = true;
      }
    }
  else if ( eventID == 4 ) {
    if ( ! lotteries[ lotteryID ].awarded ) {
      db.query( 'UPDATE t_item SET c_award = ? WHERE id = ?', [ prevBalance, lotteryID ] );

      lotteries[ lotteryID ].awarded = true;
      }
    }
  }


function events( error, result, address, lotteryID ) {
  if ( error ) console.log( error );
  else result.forEach( function ( result ) { event( result, address, lotteryID ); } );

  if ( ! --count ) db.end( function () { process.exit(); } );
  }

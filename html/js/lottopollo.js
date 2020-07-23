LottoPollo = function () {

  function __generate( _delay ) {
    LottoPollo.Render.msg();
    }


  return {

    init: function () {
      _tickerE = $( '#ticker' ).addClass( 's' + _style );

      __generate();

      $( '.log' ).scrollTop( $( '.log' ).prop( 'scrollHeight' ) );

      if ( $( '.log' ).length ) {
        $( '.log span[data-remaining]' ).each( function () {
          $( this ).countdown( $( this ).data( 'remaining' ) * 1000, function ( _e ) {
            $( this ).html( _e.strftime( '%H:%M:%S' ) );
            } );
          
          } );
        }

      if ( _remaining ) {
        $( '#remaining' ).countdown( _remaining * 1000, function ( _e ) {
          $( this ).html( _e.strftime( '%H:%M:%S' ) );
          } );
        }
      }

    };

  }();


$( LottoPollo.init );

<& /js/render.js &>\

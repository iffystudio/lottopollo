LottoPollo.Render = function () {

  var CHARS = <& /site/chars.mas &>,
      TRACKING = <& /site/tracking.mas &>,
      VIEWBOX = <& /site/viewbox.mas &>;


  return {

    msg: function ( _iframe ) {
      var _blank = '<svg class="blank" viewbox="0 0 ' + VIEWBOX[ _style ] + '">' + CHARS[ _style ].BLANK + '</svg>',
          _char, _class, _counter = 1, _i, _isAlt, _nudges, _tracking, _trialHeight = _height * <% $mobile ? 4.5 : 10 %>,
          _visibleChars = -1, _width;

      _tickerE
        .removeClass( 'h1 h2 h3 h4 h5' )
        .addClass( 'h' + _height )
        .html( '' )
        .scrollLeft( 0 );

      for ( _i = 0; _i < _msg.length; _i++ ) {
        _char = _msg[ _i ];

        _isAlt = _char.match( /[<% $LottoPollo::ALTS %>]/ );

        _class = ( _isAlt ? 'alt' : 'col' );

        _char = _char.toLowerCase();

        if ( CHARS[ _style ][ _char ] ) {
          _tickerE.append( '<svg class="' + _class + '" viewbox="0 0 ' + VIEWBOX[ _style ] + '">' + CHARS[ _style ][ _char ] + '</svg>' );
          }
        else {
          _tickerE.append( _blank );
          }
        }

      LottoPollo.Style1.render();

      while ( _visibleChars < 1 ) {
        _tickerE.css( 'height', _trialHeight + '%' );

        if ( _msg.length == 1 ) {
          _width = $( 'svg' ).width();
          }
        else {
          _width = Math.floor( $( 'svg:first-child' ).next().position().left - $( 'svg:first-child' ).position().left );
          }

        _visibleChars = Math.floor( ( $( 'body' ).width() - 10 ) / _width );

        _nudges = _visibleChars + $( 'svg' ).length;

        _trialHeight = _trialHeight - 5;
        }

      var _temp = Math.floor( ( _visibleChars - _msg.length ) / 2 );
      for ( _i = 0; _i < _temp; _i++ ) {
        _tickerE.prepend( _blank );
        _tickerE.append( _blank );
        }

      _tracking = TRACKING[ _style ][ _height - 1 ];

      if ( _iframe ) _tracking = Math.floor( _tracking / 2 );

      $( 'svg' ).width( _width - _tracking ); // eliminate Firefox non-decimal widths

      $( '.log, #ticker' ).css( 'visibility', 'visible' );

      return { nudges: _nudges, width: _width };
      }

    };

  }();

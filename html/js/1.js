LottoPollo.Style1 = function () {


  function __keyDown( _e ) {
    if ( ! _msgE.is( ':focus' ) ) {
      if ( _e.which == 32 ) __colour();
      }
    }


  function __renderColour() {
    $( 'svg.alt path.on' ).css( 'fill', '#' + _alt );
    $( 'svg.col path.on' ).css( 'fill', '#' + _colour );
    }


  return {

    init: function () {
      $( 'body' ).keydown( __keyDown );

      $( '#colour' ).on( '<% $mobile ? "touchend" : "click" %>', function () { __colour(); ga( 'send', 'event', 'interaction', 'colour', _colour ); } );
      },


    render: function () {
      __renderColour();
      }

    };

  }();


$( LottoPollo.Style1.init );

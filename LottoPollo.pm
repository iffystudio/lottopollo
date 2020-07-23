package LottoPollo;

use strict;
use utf8;

use constant ITEM_TYPE_LOTTERY => 16;

use vars qw (
  $ALTS
  @COLOURS
  %DEFAULT
  %EVENT
  $FILTER
  %MAX
  %MIN
  %STYLES
  $SYMBOLS
  %THEME
  $VALID
  );

BEGIN {

  my ( $i );

  %DEFAULT = (
    alt     => '00d0ff',
    colour  => 'eee',
    height  => 2,
    msg     => 'ypq+Fvgr+Flfgrz',
    rate    => 3
    );

  %EVENT = (
    1 => 'launched',
    2 => 'participated',
    3 => 'donated',
    4 => 'awarded',
    5 => 'refunded'
    );

  $SYMBOLS = '*\-()[\]_';

  $ALTS = 'A-Z0-9' . $SYMBOLS . '~';

  @COLOURS = ( 'ff69b4', 'e11d21', 'eb6420', 'fbca04', '009800', '207de5', '5319e7', $DEFAULT{ colour } );

  $FILTER = 'a-zA-Z0-9A-Z0-9' . $SYMBOLS . '+ ';

  %MAX = (
    height  => 5,
    rate  => 5
    );

  %MIN = (
    height  => 1,
    rate    => 1
    );

  %STYLES = (
    1 => { tracking => [ 6, 8, 10, 12, 14 ], viewbox => '102 158' }
    );

  %THEME = (
    1 => { image => 'new_mes.png' },
    2 => { image => 'happy_b.png' },
    3 => { image => 'congrat.png' },
    4 => { image => 'happy_a.png' }
    );

  $VALID = 'a-zA-Z0-9A-Z0-9' . $SYMBOLS . '~ ';
  };

1;

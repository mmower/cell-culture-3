(function( cellculture, $, undefined ){
  var colourings = [
    "#FFFFFF",
    "#800000",
    "#400000"
  ];


  var rules = [
    [0,0,0,1,0,0,0,0,0],
    [0,0,2,2,0,0,0,0,0],
    [0,0,2,2,0,0,0,0,0]
  ];


  cellculture.start_alive_p = 0.273;


  cellculture.initial_matrix = function( dim, options ) {
    return cellculture.new_matrix( dim, living_cell );
  }


  cellculture.gen_fun = function( matrix, i ) {
    return rules[matrix.cells[i]][living_neighbours(matrix,i)];
  }


  cellculture.cell_colour = function( matrix, i ) {
    return colourings[Math.min(matrix.cells[i],colourings.length-1)];
  }


  function living_cell() {
    return Math.random() < cellculture.start_alive_p ? 1 : 0;
  }


  /*
  function recurrent_matrix( matrix, history ) {
    for( var i in history ) {
      if( matrix_is_same( matrix, history[i] ) ) {
        return i;
      }
    }
    return false;
  }


  function matrix_is_same( a, b ) {
    if( a.length != b.length ) {
      return false;
    }
    for( var i = 0; i < a.length; i++ ) {
      if( a[i] != b[i] ) {
        return false;
      }
    }
    return true;
  }
  */

  function living_neighbours( matrix, i ) {
    var pos = cellculture.cell_position( matrix, i ),
        living_neighbours = 0;

    for( var y = -1; y < 2; ++y ) {
      for( var x = -1; x < 2; ++x ) {
        if( x != 0 || y != 0 ) {
          living_neighbours += (matrix.cells[cellculture.cell_address( matrix, cellculture.offset_cell_position( matrix, pos, x, y ) )])>0;
        }
      }
    }

    return living_neighbours;
  }

}(window.cellculture = window.cellculture || {}, jQuery))
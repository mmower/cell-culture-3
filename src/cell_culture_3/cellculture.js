(function( cellculture, $, undefined ) {
  var zero_func = function() { return 0; };

  cellculture.colourings = [
    "#FFFFFF",
    "#800000"
  ];

  cellculture.live_p = 0.273;

  cellculture.rules = [
    [0,0,0,1,0,0,0,0,0],
    [0,0,1,1,0,0,0,0,0]
  ];

  cellculture.setup = function( paper, dim, stable_func ) {
    var history = [new_matrix(dim,zero_func),new_matrix(dim,zero_func),new_matrix(dim,zero_func)];
    var matrix = new_matrix( dim, function() { return Math.random() < cellculture.live_p ? 1 : 0; } );
    var shapes = create_shapes( paper, matrix );
    update_shapes( matrix, shapes );

    return function() {
      var h;
      matrix = evolve_matrix( matrix );
      if( h = recurrent_matrix( matrix, history ) ) {
        stable_func(h);
      }
      history = [history[1],history[2],matrix];
      update_shapes( matrix, shapes );
    }
  };


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


  function new_matrix( dim, cell_func ) {
    var matrix = Array( dim * dim );
    matrix.dim = dim;
    matrix.t = 0;
    for( var i = 0; i < dim*dim; i++ ) {
      matrix[i] = cell_func();
    }
    return matrix;
  }


  function create_shapes( paper, matrix ) {
    var coords,
        shapes = Array( matrix.length );
    for( var i = 0; i < matrix.length; i++ ) {
      rect = cell_rect( cell_position(matrix,i), matrix.dim, paper.width, paper.height );
      shapes[i] = paper.rect(
        rect.x,
        rect.y,
        rect.w,
        rect.h,
        1
      );
    }
    return shapes;
  }


  function update_shapes( matrix, shapes ) {
    var i;
    for( i = 0; i < matrix.length; i++ ) {
      shapes[i].attr( "fill", cell_colour( matrix[i] ) );
    }
  }


  function evolve_matrix( matrix ) {
    var succ = new_matrix( matrix.dim, zero_func ),
        neighbours;
    succ.t = matrix.t + 1;
    for( var i = 0; i < matrix.length; i ++ ) {
      neighbours = living_neighbours(matrix,i);
//      console.log( i+":"+neighbours );
      succ[i] = cellculture.rules[matrix[i]][neighbours];
    }
    return succ;
  }


  function living_neighbours( matrix, i ) {
    var pos = cell_position( matrix, i ),
        scan_pos,
        living_neighbours = 0;

    for( var y = -1; y < 2; ++y ) {
      for( var x = -1; x < 2; ++x ) {
        if( x != 0 || y != 0 ) {
//          console.log( "x="+x+",y="+y );
          living_neighbours += matrix[cell_address( matrix, offset_cell_position( matrix, pos, x, y ) )];
        }
      }
    }

    return living_neighbours;
  }


  function cell_position( matrix, i ) {
    return {
      y: Math.floor( i / matrix.dim ),
      x: i % matrix.dim
    };
  }


  function axis_shift( matrix, v, delta ) {
    v += delta;
    if( v < 0 ) {
      v += matrix.dim;
    } else if( v >= matrix.dim ) {
      v -= matrix.dim;
    }
    return v;
  }


  function offset_cell_position( matrix, pos, dx, dy ) {
    return {
      x: axis_shift( matrix, pos.x, dx ),
      y: axis_shift( matrix, pos.y, dy )
    };
  }


  function cell_address( matrix, pos ) {
    return ( pos.y * matrix.dim ) + pos.x;
  }


  function cell_rect( cell_pos, dim, width, height ) {
    return {
      y: ( height / dim ) * cell_pos.y,
      x: ( width / dim ) * cell_pos.x,
      w: width / dim,
      h: height / dim
    };
  }


  function cell_colour( life ) {
    return cellculture.colourings[Math.min(life,cellculture.colourings.length-1)];
  }

}( window.cellculture = window.cellculture || {}, jQuery ));

(function( cellculture, $, undefined ) {

  cellculture.setup = function( paper, dim, options ) {
    options = options || {};

    paper.clear();

    var matrix = cellculture.initial_matrix( dim, options );
    var shapes = create_shapes( paper, matrix );
    update_shapes( matrix, shapes );

    return function() {
      matrix = evolve_matrix( matrix, options );
      update_shapes( matrix, shapes );
      return {
        gen: matrix.gen
      };
    };
  };


  cellculture.new_matrix = function( dim, cell_func ) {
    return {
      dim: dim,
      gen: 1,
      cells: cell_generator( dim, cell_func )
    };
  }


  function evolve_matrix( matrix ) {
    return {
      dim: matrix.dim,
      gen: matrix.gen + 1,
      cells: cell_generator( matrix.dim, function(i) { return cellculture.gen_fun(matrix,i) } )
    };
  }


  function cell_generator( dim, cell_func ) {
    return _.range( dim * dim ).map( function(i) { return cell_func( i ) } );
  }


  function create_shapes( paper, matrix ) {
    return _.range( matrix.dim * matrix.dim ).map( function( i ) {
      var rect = cell_rect( cellculture.cell_position(matrix,i), matrix.dim, paper.width, paper.height );
      return paper.rect( rect.x, rect.y, rect.w, rect.h, 1 );
    });
  }


  function update_shapes( matrix, shapes ) {
    _.each( shapes, function(shape,i) {
      shape.attr( "fill", cellculture.cell_colour( matrix, i ))
    });
  }


  cellculture.cell_position = function( matrix, i ) {
    return {
      y: Math.floor( i / matrix.dim ),
      x: i % matrix.dim
    };
  }


  function offset_index_wrapped( matrix, v, delta ) {
    var fv = v + delta;
    if( fv < 0 ) {
      return fv + matrix.dim;
    } else if( fv >= matrix.dim ) {
      return fv - matrix.dim;
    } else {
      return fv;
    }
  }


  cellculture.offset_cell_position = function( matrix, pos, dx, dy ) {
    return {
      x: offset_index_wrapped( matrix, pos.x, dx ),
      y: offset_index_wrapped( matrix, pos.y, dy )
    };
  }


  cellculture.cell_address = function( matrix, pos ) {
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

}( window.cellculture = window.cellculture || {}, jQuery ));

(function( cellculture ) {

  cellculture.setup = function( options ) {
    options = options || {};

    var dim = options['dim'],
        draw_fun = options['draw_fun'],
        update_fun = options['update_fun'];

    var matrix = cellculture.initial_matrix( dim, options );
    var shapes = draw_fun( matrix );
    update_fun( matrix, shapes );

    return function() {
      matrix = evolve_matrix( matrix, options );
      update_fun( matrix, shapes );
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


  cellculture.cell_rect = function( cell_pos, dim, width, height ) {
    return {
      y: ( height / dim ) * cell_pos.y,
      x: ( width / dim ) * cell_pos.x,
      w: width / dim,
      h: height / dim
    };
  }

}( window.cellculture = window.cellculture || {} ));

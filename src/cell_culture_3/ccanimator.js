(function( ccanimator ){

  var interval = null;
  var setup_fun = null;
  var gen_fun = null;

  ccanimator.frame_rate = 60;

  ccanimator.event_fun = null;

  ccanimator.setup = function( fun ) {
    setup_fun = fun;
    gen_fun = setup_fun();
  }


  ccanimator.start = function() {
    interval = setInterval( nextFrame, frameDelay() );
    trigger( "start" );
  }


  ccanimator.stop = function() {
    clearInterval( interval );
    interval = null;
    trigger( "stop" );
  }


  ccanimator.toggle = function() {
    if( isAnimating() ) {
      ccanimator.stop();
    } else {
      ccanimator.start();
    }
  }


  ccanimator.whilePaused = function( dofun ) {
    var should_restart = isAnimating();
    if( should_restart ) {
      ccanimator.stop();
    }
    dofun();
    if( should_restart ) {
      ccanimator.start();
    }
  }


  ccanimator.reset = function() {
    ccanimator.whilePaused(function() {
      gen_fun = setup_fun();
    })
    trigger( "reset" )
  }


  ccanimator.step = function() {
    nextFrame();
  }


  function nextFrame() {
    var info = gen_fun();
    trigger( "frame", info );
  }


  function isAnimating() {
    return interval != null;
  }


  function frameDelay() {
    return ( 60 / ccanimator.frame_rate ) * 1000;
  }


  function trigger( event, info ) {
    info = info || {};
    if( ccanimator.event_fun ) {
      ccanimator.event_fun( event, info );
    }
  }

}(window.ccanimator = window.ccanimator || {}))
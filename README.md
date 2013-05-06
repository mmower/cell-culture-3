# cell-culture-3

I'm reading **Complexity** by M. Mitchell Waldrop and was intrigued by his description of a very early experiment
in cellular automata by Chris Langton and then Conway's Game of Life. I've probably done it several times before but
decided to reimplement Life using the same cellculture JS library I developed for Langton's automata.

This version allows you to define the dimensions of the cell matrix, the seed for the random number generator, and
the starting probability that any given cell in the matrix will be alive. You can now rerun the same simulation over
to watch it again. The generation numbers are also printed.


It currently uses a simple randomised starting point. Watch [life here](http://htmlpreview.github.com/?https://github.com/mmower/cell-culture-3/blob/master/src/cell_culture_3/index.html)

## Credits

* Bootstrap: http://twitter.github.io/bootstrap/
* jQuery: http://jquery.com/
* underscore.js: http://underscorejs.org/
* bootstrap-slider: http://www.eyecon.ro/bootstrap-slider/
* seedrandom.js: http://davidbau.com/encode/seedrandom.js

## License

Copyright © 2013 Matt Mower <self@mattmower.com>

See LICENSE.txt

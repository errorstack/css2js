var output = require('../lib/output.js');

output({
  path:__dirname + '/css',
  src:['a.css', 'b.css'],
  dest:__dirname + '/output/style.js'
});
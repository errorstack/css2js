var fs = require('fs');
var compile = require('./compile');

module.exports = function(files, wrapper){
  var contents = [];
  files.forEach(function(file){
    var exists = fs.existsSync(file);
    if(!exists){
      throw new Error('Cannot find file ' + file);
    }

    var data = fs.readFileSync(file);
    contents.push(data.toString());
  });

  return compile(contents.join('\n'), wrapper);
}
var inline = require('./inline');
var path = require('path');
var fs = require('fs');

module.exports = function(options){
  setDefault(options, {
    path: '/',
    src: [],
    dest: '',
    wrapper: undefined
  });

  var src = options.src;
  var dest = path.resolve(options.path, options.dest);

  if(!dest){
    throw new Error('dest option:' + dest.toString() + ' is invalid');
    return;
  }

  if(!src || src.length === 0){
    throw new Error('src option:' + src.toString() + ' is invalid');
    return;
  }

  var files = [];
  if(src instanceof Array){
    src.forEach(function(file){
      file = path.resolve(options.path, file);
      files.push(file);
    });

  }else if(typeof src == 'string'){
    files.push(path.resolve(options.path, src));
  }

  var content = inline(files, options.wrapper);
  mkdirs(path.dirname(dest));
  fs.writeFileSync(dest, content);
}

function setDefault(owner, map){
  if(!owner)return;
  if(!map)return;

  for(var prop in map){
    if(typeof owner[prop] == 'undefined'){
      owner[prop] = map[prop];
    }
  }
}

function mkdirs(dirpath, mode){
  var exists = fs.existsSync(dirpath);
  if(exists){
    return;
  }

  mkdirs(path.dirname(dirpath), mode);
  fs.mkdirSync(dirpath, mode);
};
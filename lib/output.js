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

  if(isDir(dest)){
    writeToDir(dest, files, options.wrapper)
  }else{
    writeToSingleFile(dest, files, options.wrapper)
  }
}

function writeToSingleFile(dest, files, wrapper){
  var content = inline(files, wrapper);
  mkdirs(path.dirname(dest));
  fs.writeFileSync(dest, content);
}

function writeToDir(dest, files, wrapper){
  mkdirs(dest);

  var content;
  files.forEach(function(file){
    content = inline([file], wrapper);
    fs.writeFileSync(path.resolve(dest, './' + path.basename(file, path.extname(file))) + '.js' , content);
  });
}

function isDir(pathString){
  if(!pathString)return false;
  if(typeof pathString != 'string')return false;
  if(pathString.substr(pathString.length - 1,1) == '/')return true;
  if(path.extname(pathString) === '')return true;
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
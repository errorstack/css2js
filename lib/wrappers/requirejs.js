module.exports = function(string){
  return [
    'define([],function(){\n',
      string + '\n',
    '});'
  ].join('');
}
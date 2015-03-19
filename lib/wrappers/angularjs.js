module.exports = function(string){
  return [
    'angular.module("css2js.style",[]).run(function(){\n',
      string + '\n',
    '});'
  ].join('');
}
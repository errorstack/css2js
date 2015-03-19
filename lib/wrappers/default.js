module.exports = function(string){
  return [
    '(function(){\n',
      string + '\n',
    '})();'
  ].join('');
}
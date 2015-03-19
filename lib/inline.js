var fs = require('fs');
var wrappers = require('./wrappers/');

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

  return wrap(toJs(contents.join('\n')), wrapper);


  function wrap(string, wrapper){
    if(typeof wrapper == 'string'){
      wrapper = wrappers[wrapper];
    }
    if(!(wrapper instanceof Function)){
      wrapper = wrappers.default;
    }

    var insertStyle = [
      '    var cssText = ' + string + ';\n' ,
      '    var styleEl = document.createElement("style");\n' ,
      '    document.getElementsByTagName("head")[0].appendChild(styleEl);\n' ,
      '    if (styleEl.styleSheet) {\n' ,
      '        if (!styleEl.styleSheet.disabled) {\n' ,
      '            styleEl.styleSheet.cssText = cssText;\n' ,
      '        }\n' ,
      '    } else {\n' ,
      '        try {\n' ,
      '            styleEl.innerHTML = cssText;\n' ,
      '        } catch(e) {\n' ,
      '            styleEl.innerText = cssText;\n' ,
      '        }\n' ,
      '    }' 
    ].join('');

    return wrapper(insertStyle);
  }

  function toJs(css) {
    var cssLines = css.split(/\r?\n/), 
        cssLineCount = cssLines.length;

    return '[' + cssLines.map(function (l, idx) {
        var isLastOne = idx === (cssLineCount - 1);
        l = l.replace(/\\/g, '\\\\');
        l = l.replace(/\"/g, '\\"');
        return '"' + l + '' + (!isLastOne ? '\\n' : '') + '"';
    }).join(',') + '].join("")';
  };
}
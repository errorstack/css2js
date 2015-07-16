var wrappers = require('./wrappers/');

module.exports = function(content, wrapper){
  return wrap(toJs(content), wrapper);

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
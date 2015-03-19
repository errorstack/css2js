# CSS2JS - Build Standalone UI Modules

CSS2JS cloud help you build standalone UI modules without reference addtional CSS file. You can compile your CSS to a normal JavaScript file, a RequireJS module, AngularJS module or any other custom JavaScript module.

## Install
npm install es-css2js -g

## Example usage
### From command-line:
css2js srouce1.css source2.css source3.css ... sourceN.css dest.js

The file path will be related to your current executing path.

### From node

````javascript
#!/usr/bin/env node

var css2js = require('es-css2js');  
css2js({
  path: "/basepath",  //base path of source file and destination file, defaults to "/"
  src:  ["a.css", "b.css"], //source file
  dest: "dest.js" // destination file,
  wrapper: "requirejs" // Your module wrapper. Defaults to a function closure. It also cloud be a function like the following sample:
});

function customWrapper(content){
	return "hello!!![" + content + "]hello!!!";
}
````

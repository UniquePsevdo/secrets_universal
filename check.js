/*const NativePromise = require('native-promise');
global["NativePromise"] = NativePromise;*/
require('zone.js/dist/zone-node');
//console.log(global["NativePromise"]);
const fs = require('fs');
const domino = require('domino');
const path = require('path');
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
global["XMLHttpRequest"] = XMLHttpRequest;
const template = fs.readFileSync(path.join(process.cwd(), 'dist', 'browser', 'index.html')).toString();
const win = domino.createWindow(template);
global['window'] = domino.createWindow(win);
//global['document'] = undefind;
try{
    let data1 = require((__dirname + '/dist/server/main.bundle.js'));
    console.log(data1);
}catch(err){
    console.log(err);
}


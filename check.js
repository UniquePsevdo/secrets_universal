const fs = require('fs');
const domino = require('domino');
const path = require('path');
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const template = fs.readFileSync(path.join(process.cwd(), 'dist', 'browser', 'index.html')).toString();
const win = domino.createWindow(template);
global['window'] = domino.createWindow(win);
global['document'] = undefined;
global["XMLHttpRequest"] = XMLHttpRequest;
let data1 = require((__dirname + '/dist/server/main.bundle.js'));
console.log(data1);
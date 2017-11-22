const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const apiRouter = require('./server/apiRoutes/apiRouter');
const mongoose = require('mongoose');
var cors = require('express-cors');
const i18n = require("i18n");
var favicon = require('serve-favicon');
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
//require('import-export');
const {notFound, developmentErrors, productionErrors} = require('./server/handlers/errorHandlers');

i18n.configure({
    locales:['ua', 'en'],
    directory: __dirname + '/src/assets/locales',
    defaultLocale: 'ua',
});

//db setup
mongoose.connect('mongodb://VolodymyrSydorov:My_1ntent10ns@ds143191.mlab.com:43191/the_secrets');

//app setup
app.use(morgan('combined'));

app.use(i18n.init);

app.use(favicon(__dirname + '/dist/browser/favicon.ico'));

/*app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');*/

var whitelist = ['http://localhost:3090'];
app.use(cors({
    allowedOrigins: whitelist
}))
app.use(bodyParser.json({type: '*/*'}));

app.use('/api/', apiRouter);

const domino = require('domino');
const fs = require('fs');
const path = require('path');
const DIST_FOLDER = path.join(process.cwd(), 'dist');
// Our index.html we'll use as our template
const template = fs.readFileSync(path.join(process.cwd(), 'dist', 'browser', 'index.html')).toString();
//const win = domino.createWindow(template);
global['window'] = domino.createWindow(template);
global['document'] = undefined;
global["XMLHttpRequest"] = XMLHttpRequest;

/*require('zone.js/dist/zone-node');
require('reflect-metadata');
require('rxjs/Rx');*/
//let renderModule = require('@angular/platform-server').renderModule;
let enableProdMode = require('@angular/core').enableProdMode;

// Faster server renders w/ Prod mode (dev mode never needed)
enableProdMode();

// * NOTE :: leave this as require() since this file is built Dynamically from webpack
const {AppServerModule, LAZY_MODULE_MAP} = require(path.join(process.cwd(), 'dist', 'server','main.bundle.js'));
console.log('AppServerModule', AppServerModule);
//const AppServerModule = bundle["AppServerModule"];
//const LAZY_MODULE_MAP = bundle["LAZY_MODULE_MAP"];

// Express Engine
const ngExpressEngine = require('@nguniversal/express-engine').ngExpressEngine;
// Import module map for lazy loading
const provideModuleMap = require('@nguniversal/module-map-ngfactory-loader').provideModuleMap;

// Our Universal express-engine (found @ https://github.com/angular/universal/tree/master/modules/express-engine)
app.engine('html', ngExpressEngine({
    bootstrap: AppServerModule,
    providers: [
        provideModuleMap(LAZY_MODULE_MAP)
    ]
}));

app.set('view engine', 'html');
app.set('views', path.join(DIST_FOLDER, 'browser'));

/* - Example Express Rest API endpoints -
  app.get('/api/**', (req, res) => { });
*/

// Server static files from /browser
app.get('*.*', express.static(path.join(DIST_FOLDER, 'browser'), {
    maxAge: '1y'
}));

// ALl regular routes use the Universal engine
function ngApp(req, res) {
    res.render('index', {req});
}

let data = JSON.parse(fs.readFileSync(`./src/assets/locales.json`, 'utf8'));

app.get('/', ngApp);
data.locales.forEach(route => {
    app.get(`/${route}`, ngApp);
    app.get(`/${route}/*`, ngApp);
});

app.use(notFound);
console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === 'development') {
    app.use(developmentErrors);
}else{
    app.use(productionErrors);
}


// Start up the Node server
const port = process.env.PORT || 3090;
const server = http.createServer(app);
server.listen(port);
console.log('Server is listening on port: ' + port);

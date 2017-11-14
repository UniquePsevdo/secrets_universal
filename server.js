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
const {notFound, developmentErrors, productionErrors} = require('./server/handlers/errorHandlers');

i18n.configure({
    locales:['ua', 'en'],
    directory: __dirname + '/locales',
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



require('zone.js/dist/zone-node');
require('reflect-metadata');
let renderModuleFactory = require('@angular/platform-server').renderModuleFactory;
let enableProdMode = require('@angular/core').enableProdMode;

/*import * as express from 'express';*/
const join = require('path').join;
const readFileSync = require('fs').readFileSync;

// Faster server renders w/ Prod mode (dev mode never needed)
enableProdMode();

const DIST_FOLDER = join(process.cwd(), 'dist');

// Our index.html we'll use as our template
const template = readFileSync(join(DIST_FOLDER, 'browser', 'index.html')).toString();

// * NOTE :: leave this as require() since this file is built Dynamically from webpack
const { AppServerModuleNgFactory, LAZY_MODULE_MAP } = require('./dist/server/main.bundle');

// Express Engine
const ngExpressEngine = require('@nguniversal/express-engine').ngExpressEngine;
// Import module map for lazy loading
const provideModuleMap = require('@nguniversal/module-map-ngfactory-loader').provideModuleMap;

// Our Universal express-engine (found @ https://github.com/angular/universal/tree/master/modules/express-engine)
app.engine('html', ngExpressEngine({
    bootstrap: AppServerModuleNgFactory,
    providers: [
        provideModuleMap(LAZY_MODULE_MAP)
    ]
}));

app.set('view engine', 'html');
app.set('views', join(DIST_FOLDER, 'browser'));

/* - Example Express Rest API endpoints -
  app.get('/api/**', (req, res) => { });
*/

// Server static files from /browser
app.get('*.*', express.static(join(DIST_FOLDER, 'browser'), {
    maxAge: '1y'
}));

// ALl regular routes use the Universal engine
function ngApp(req) {
    res.render('index', {req});
}

let data = JSON.parse(readFileSync(`src/assets/locales.json`, 'utf8'));

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

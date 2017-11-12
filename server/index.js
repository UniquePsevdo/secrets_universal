const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const apiRouter = require('./apiRoutes/apiRouter');
const mongoose = require ('mongoose');
const cors = require ('cors');
const i18n = require("i18n");
const {notFound, developmentErrors, productionErrors} = require('./handlers/errorHandlers');

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

/*app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');*/

var whitelist = ['http://localhost:4200'];
var corsOptions = {
	origin: function (origin, callback) {
		if (whitelist.indexOf(origin) !== -1) {
			callback(null, true)
		} else {
			callback(new Error('Not allowed by CORS'))
		}
	}
}
app.use(cors(corsOptions));
app.use(bodyParser.json({type: '*/*'}));

app.use('/api/', apiRouter);

app.use(notFound);
console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === 'development') {
	app.use(developmentErrors);
}else{
	app.use(productionErrors);
}

//server setup
const port = process.env.PORT || 3090;
const server = http.createServer(app);
server.listen(port);
console.log('Server is listening on port: ' + port);
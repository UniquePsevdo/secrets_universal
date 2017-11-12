exports.notFound = (req, res, next) => {
	const err = new Error('Not Found');
	err.status = 404;
	next(err);
};

exports.developmentErrors = (err, req, res) => {
	if(err){
		console.log('developmentErrors', err);
	}
	res.status(err.status || 500);
	res.render('error', {
		message: err.message,
		error: err
	});
};

exports.productionErrors = (err, req, res, next) => {
	if(err){
		console.log('productionErrors', err);
	}
	res.status(err.status || 500);
	res.render('error', {
		message: err.message,
		error: {}
	});
};
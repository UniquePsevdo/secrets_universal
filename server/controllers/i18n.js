exports.getLocales = function (req, res, next) {
	res.send({
		"data": [
			{
				code: "ua",
				id: 0,
				is_default: 1,
				locale: "uk-UA",
				title: "Українська"
			}, {
				code: "en",
				id: 1,
				is_default: 0,
				locale: "en-US",
				title: "English"
			}]
	});
	
}

exports.sendTranslations = function (req, res) {
	res.send(req.getCatalog(req.getLocale()));
}
const AuthenticationCtrl = require('../controllers/authentication');
const CabinetCtrl = require('../controllers/cabinet');
const I18nCtrl = require('../controllers/i18n');
const passportConfig = require('../services/passport');
const passport = require('passport');
const express = require('express');
const apiRouter = express.Router();
const requireSignin = passport.authenticate('local', {session:false});
const requireAuth = passport.authenticate('bearer', {session: false});

apiRouter.post('/login', requireSignin, AuthenticationCtrl.login);
apiRouter.post('/register', AuthenticationCtrl.register);
apiRouter.post('/refresh', requireAuth, AuthenticationCtrl.login);

apiRouter.get('/locales', I18nCtrl.getLocales);
apiRouter.get('/translations', I18nCtrl.sendTranslations);

module.exports = apiRouter;
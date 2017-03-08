var express = require('express');
var router = express.Router();
var users = require('../utils/user/registration');
/* GET users listing. */
  router.get('/users', function(req, res, next) {
    res.send('respond with a resource');
  });
  router.get('/users/register/checkemail', users.checkUserEmails);
  router.get('/users/login/', users.checkNLogin);
  router.get('/users/getUser', users.getUser);
  router.post('/users/forgotPassword', users.forgotPasswordSendLink);
  router.put('/users/resetpassword', users.resetPassword);
  router.delete('/users/logout', users.checkLogout);
  router.post('/users/register/createUser', users.createRegisterUser);
  router.post('/users/register/confirmregistration', users.confirmRegistration);



module.exports = router;

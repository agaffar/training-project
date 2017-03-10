var express = require('express');
var router = express.Router();
var users = require('../utils/user/registration');
var userData = require('../utils/user/userData.js');
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
  router.get('/api/users/user/getProfile', userData.getUserProfile);
  router.get('/api/users/user/getAddress', userData.getUserAddress);
  router.post('/api/users/user/saveAddress', userData.saveAddress);
  router.delete('/api/users/user/deleteAddress', userData.deleteAddress);


module.exports = router;

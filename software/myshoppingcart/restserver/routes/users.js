var express = require('express');
var router = express.Router();
var users = require('../utils/user/registration');
var userData = require('../utils/user/userData.js');
/* GET users listing. */
  router.get('/users', function(req, res, next) {
    res.send('respond with a resource');
  });
  router.get('/api/users/register/checkemail', users.checkUserEmails);
  router.get('/api/users/login/', users.checkNLogin);
  router.get('/api/users/getUser', users.getUser);

  router.post('/api/users/forgotPassword', users.forgotPasswordSendLink);
  router.put('/api/users/resetpassword', users.resetPassword);
  router.delete('/api/users/logout', users.checkLogout);
  router.post('/api/users/register/createUser', users.createRegisterUser);
  router.post('/api/users/register/confirmregistration', users.confirmRegistration);
  router.get('/api/users/user/getProfile', userData.getUserProfile);
  router.put('/api/users/user/saveProfile', userData.saveUserProfiles);
  router.get('/api/users/user/getAddress', userData.getUserAddress);
  router.post('/api/users/user/saveAddress', userData.saveAddress);
  router.delete('/api/users/user/deleteAddress', userData.deleteAddress);


module.exports = router;

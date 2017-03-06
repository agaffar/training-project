var express = require('express');
var router = express.Router();
var users = require('../utils/user/registration');
/* GET users listing. */
  router.get('/users', function(req, res, next) {
    res.send('respond with a resource');
  });
  router.get('/users/register/checkemail', users.checkUserEmails);
  router.post('/users/register/createUser', users.createRegisterUser);
  router.post('/users/register/confirmregistration', users.confirmRegistration);



module.exports = router;

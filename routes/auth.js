const express = require('express');
const router = express.Router();
const usersAuth = require('../controller/authTokenHandler');
var config = require('../config');
const vendorController = require('../controller/vendorsController');
const auth = require("../middleware/middleware");


let usersHandler = new usersAuth();
let vendorHandler = new vendorController();

//Users Auth Routes
router.post('/register', usersHandler.register);
router.post('/login', usersHandler.login);
router.post('/checkemail', usersHandler.checkEmailAvailability);
router.get('/logout',auth.checkUserToken, usersHandler.logout);


//Vendor Auth Routes
router.post('/loginvendor', vendorHandler.vendorLogin);
router.post('/registervendor', vendorHandler.vendorsRegister);
router.post('/checkvendoremail', vendorHandler.checkEmailAvailability);
router.get('/vendorlogout',auth.checkVendorToken, vendorHandler.logout);


module.exports = router;
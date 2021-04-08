let jwt = require('jsonwebtoken');
const User = require('../models/User');
const Vendor = require('../models/Vendor');
const config = require('../config.js');

let checkUserToken = (req, res, next) => {
  let token = req.headers['x-access-token'] || req.headers['authorization']; // Express headers are auto converted to lowercase


  if (token) {
    if (token.startsWith('Bearer ')) {
        // Remove Bearer from string
        token = token.slice(7, token.length);
      }
      
    jwt.verify(token, config.secret, async (err, decoded) => {
      if (err) {
        return res.json({
          success: false,
          message: 'Token is not valid'
        });
      } else {
        req.decoded = decoded;
        
        const user = await User.findOne({
          _id: decoded.id, 'tokens.token': token
      })
      
      if(!user){
        return res.json({
          success: false,
          message: 'Auth token is not supplied'
        });
      }
      req.user = user
      req.token = token
        next();
      }
    });
  } else {
    return res.json({
      success: false,
      message: 'Auth token is not supplied'
    });
  }
};



let checkVendorToken = (req, res, next) => {
  let token = req.headers['x-access-token'] || req.headers['authorization']; // Express headers are auto converted to lowercase


  if (token) {
    if (token.startsWith('Bearer ')) {
        // Remove Bearer from string
        token = token.slice(7, token.length);
      }
      
    jwt.verify(token, config.secret, async (err, decoded) => {
      if (err) {
        return res.json({
          success: false,
          message: 'Token is not valid'
        });
      } else {
        req.decoded = decoded;
        
        const vendor = await Vendor.findOne({
          _id: decoded.id, 'tokens.token': token
      })
  
      if(!vendor){
        return res.json({
          success: false,
          message: 'Auth token is not supplied'
        });
      }
      req.vendor = vendor
      req.business_type = vendor.businessType
        next();
      }
    });
  } else {
    return res.json({
      success: false,
      message: 'Auth token is not supplied'
    });
  }
};

module.exports = {
  checkUserToken: checkUserToken,
  checkVendorToken: checkVendorToken
}

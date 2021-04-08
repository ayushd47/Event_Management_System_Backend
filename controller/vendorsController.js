const vendor = require("../models/Vendor");
let jwt = require('jsonwebtoken');
let config = require('../config');
var bcrypt = require('bcrypt');
class VendorsController{

    vendorLogin(req, res){
            vendor.findOne({email : req.body.email}, function(err, vendor){
                if(err){
                    return res.status(500).send('Error on the server');
                    
                }
                
                if(!vendor){
                    return res.status(401).json({
                        success : false,
                        message: 'Incorrent username or password',
                        token : null
                    });
                }

                var passwordIsValid = bcrypt.compareSync(req.body.password, vendor.password);

                if(!passwordIsValid){
                    return res.status(401).json({
                        success : false,
                        message: 'Incorrent username or password',
                        token : null
                    });
                }
                
                let token = jwt.sign({id : vendor._id},config.secret, 
                    {
                        expiresIn : '24h'
                    }) ;
                    vendor.tokens = vendor.tokens.concat({ token: token });
                    vendor.save();


                    res.status(200).json({
                        success : true,
                        message : 'Authentication successful',
                        token : token,
                        name : vendor.fullname,
                        email : vendor.email,
                        type : vendor.businessType
                    });

            });
    }


    vendorsRegister(req, res){
        var hashedPassword = bcrypt.hashSync(req.body.password, 8);
        
        vendor.create({
           fullname : req.body.fullname,
           email : req.body.email,
           location : req.body.location,
           contact : req.body.contact,
           businessType : req.body.type,
           password : hashedPassword,

        },
        function(err, vendor){
            if(err) return res.status(500).send(err);
            let token = jwt.sign({id : vendor._id},config.secret, 
                {
                    expiresIn : '24h'
                }) ;
                
                vendor.tokens = vendor.tokens.concat({ token: token });
                vendor.save(); 

            res.send({
                success : true,
                message : "Registered Successfully!",
                token : token,
                name : vendor.fullname,
                email : vendor.email,
                type : vendor.businessType
            });

        }   
        );
    }

    

        checkEmailAvailability(req, res){
           
            
            vendor.findOne({email : req.body.email}, function(err, vendor){
                if(err){
                    return res.status(500).send('Error on the server');
                    
                }
        
                if(vendor){
                   
                    return res.send({
                        success : false,
                        message: 'Email Already Exists',
                        
                    });
                }else{
                    return res.send({
                        success : true,
                        message: 'Email Available',
                        
                    });
                }
                
            })
        }


        logout(req, res){
            vendor.findById(req.vendor._id, function(err, vendordata){
     
              var  deletetoken = {token : req.token}

            
                vendordata.tokens = vendordata.tokens.splice(vendordata.tokens.indexOf(deletetoken), 1);

                vendordata.save((err, data) => {
                    if(err) return res.send({
                        success : false,
                        message : err.message
                    })
                })

                return res.send({
                    success : true,
                    message : "Logged Out",

                })
            })
        }

}

module.exports = VendorsController;
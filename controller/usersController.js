
const user = require('../models/User');
const rating = require('../models/Rating');
const fs = require('fs');
const wedding = require('../models/Wedding');
const vendor = require('../models/Vendor');
const venue = require('../models/Venue');
const business = require('../models/Business');
const booking = require('../models/Booking');
const comments = require('../models/Comment');


//Checking if The Directory Exists
var checkIfDirectoryExists = (dirname, successcallback, errorcallback) => {
    try{
        var stats = fs.lstatSync(dirPath);
       
        if (stats.isDirectory()) {
            successCallback();
        }
    }catch(e){
        errorcallback();
    }
}

 var mkdirectory = (dirPath) => {

    return new Promise(function(resolve, reject) {
        checkIfDirectoryExists(dirPath, function() {
            resolve();
        }, function() {
            fs.mkdirSync(dirPath);
            resolve();
        });
    });

}


//User Controller class 
class UsersController {


    //Function For getting the users through token
     getUsers(req, res){
            res.json({
                success : true,
                userdata : req.user
            });
    }


    //Function for udating the user 
    updateUser(req, res){
        user.findByIdAndUpdate(req.user._id, req.body, function(err, userdata){
            if(err) return res.send({
                success : false,
                message : err.message
            })

            user.findById(userdata._id, function(err, data){
                if(err) return res.send({
                    success : false,
                    message : err.message
                })

                return res.send({
                    success : true,
                    message : "User Updated!",
                    userdata : data
                })
            })
        })
    }


    //Function for deleting the user through token
    deleteUser(req, res){

        wedding.find({userid : req.user._id}, function(err, weddingdata){
            if(err) return res.send({
                success : false,
                message : err.message
            })
           
            weddingdata.map((value) => {
                 
                booking.findOneAndDelete({weddingid : value._id}, function(err, data){
                   if(err) console.log(err)
                });
            });
        });

        comments.deleteMany({userid : req.user._id}), function(err, data){
            if(err) return res.send({
                success : false,
                message : err.message
            })
        }

       
        wedding.findOneAndDelete({userid : req.user._id}, function(err, data){
            if(err) return res.send({
                success : false,
                message : err.message
            })

            user.findByIdAndDelete(req.user._id, function(err, data){
                if(err) return res.send({
                    success : false,
                    message : err.message
                })
                 
                return res.send({
                    success : true,
                    message : "User Deleted!"
                })
            })
        })
      
    }

    uploadImage(req, res){
        req.files.map(function(item){
            var path = "public/images";
            var imagename = item.filename;
            var updateimagename = req.user._id + "/" + imagename

            user.findByIdAndUpdate(req.user._id, {profileImg : updateimagename}, function(err){

                user.findById(req.user._id, function(err, userdata){

                    if(err) return res.send(err.message)

                    var dirname =  path + "/" + req.user._id;
                    var tmpfilename = userdata.profileImg;
                    var splitFilename = tmpfilename.split("/");
                    var filename = splitFilename[1];
                    var fileExists =  fs.existsSync(dirname);

                     if (fileExists) {
                        try{
                            fs.rename('public/images/tmp/' + filename, dirname + "/" + filename, function(err){
                                if(err) return res.send(err.message)
                                return res.send({
                                    success : true,
                                 
                                    userdata : userdata
                                })
                            })
                        }catch(e){
                            return res.send(e.message)
                        }
                     }
                     else{
                      mkdirectory(dirname).then(function(){
                         try{
                             fs.rename('public/images/tmp/' + filename, dirname + "/" + filename, function(err){
                                 if(err) return res.send(err.message)
                                 return res.send({
                                    success : true,
                                   
                                    userdata : userdata
                                })
                             })
                         }catch(e){
                             return res.send(e.message)
                         }                
                     })
                     }
                })     
            })
        })
    }


    getRatings(req, res){
        rating.findOne({venueid : req.body.venueid, userid : req.user._id}, function(err, rating){
            if(err) return res.send({
                success : false,
                message : err.message
            })
            if(!rating){
                return res.send({
                    success : false,
                    rating : null
                })
            }else{
                return res.send({
                    success : true,
                    rating : rating
                })
            }
          
        })
    }

    getVendor(req, res){
        return res.send({
            success : true,
            vendor : req.vendor
        })
    }


    updateVendor(req, res){
        vendor.findByIdAndUpdate(req.vendor._id, req.body, function(err, vendordata){
            if(err) return res.send({
                success : false,
                message : err.message
            })

            vendor.findById(vendordata._id, function(err, data){
                if(err) return res.send({
                    success : false,
                    message : err.message
                })

                return res.send({
                    success : true,
                    message : "Vendor Updated!",
                    vendor : vendordata
                })
            })
        })
    }

    deleteVendor(req, res){
        
           

            venue.deleteMany({vendorid : req.vendor._id}, function(err, data){
                if(err) return res.send({
                    success: false,
                    message : err.message
                })
            })

   

            business.deleteMany({vendorid : req.vendor._id}, function(err, data){
                if(err) return res.send({
                    success: false,
                    message : err.message
                })
            })
           
     

            vendor.findByIdAndDelete(req.vendor._id, function(err, data){
                if(err) return res.send({
                    success : false,
                    message : err.message
                })
                 
                return res.send({
                    success : true,
                    message : "Vendor Deleted!"
                })
            })
      
    }

    testFunction(req){
       
        user.findOne({firstname : req.firstname}, function(err, data){
            if(err) return (err);
           
            return  data
           
        })
    }



}

module.exports = UsersController;
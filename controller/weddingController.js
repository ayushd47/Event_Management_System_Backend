const wedding = require('../models/Wedding');
const nodemailer = require('nodemailer');
const booking = require('../models/Booking');
const invitation = require('../models/Invitation');
const ejs = require('ejs');
const fs = require('fs');


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

class WeddingController{


    addWedding(req, res){
        wedding.create({
            userid : req.user._id,
        
            brideName : req.body.bridename,
            groomName : req.body.groomname,
            weddingDate : req.body.date,
            album : [],
          
         
                   
          
        }, function(err, wedding){
            if(err) return res.send({
                success : false,
                message : err.message
            })

            return res.send({
                success : true,
                message : "Wedding Registered",
                wedding : wedding,
            })
        })
    }

    getWeddingsByUser(req, res){
        wedding.find({userid : req.user._id}, function(err, weddings){
            if(err) return res.send({
                success : false,
                message : err.message
            })

            return res.send({
                success : true,
                weddings: weddings
            })
        })
    }

    getWedding(req, res){
        wedding.findById(req.body.weddingid).populate("weddingVenue weddingPhotography weddingBakery weddingMakeup").exec(function(err, wedding){
            if(err) return res.send({
                success : false,
                message : err.message
            })

            return res.send({
                success : true,
                wedding : wedding
            })
        })
    }


    addInvitaion(req, res){
      
       invitation.create({

           name : req.body.name,
           email : req.body.email,
           weddingid : req.body.weddingid

       },  function(err, invitationdata){

         
        wedding.findById(req.body.weddingid).populate("weddingVenue").exec(async function(err, data){

            if(err) return res.send({
                success : false,
                message : err.message
            })

            let senderemail = req.user.email;
               

            await nodemailer.createTestAccount((err, account) => {
               
    
                ejs.renderFile(  "./public/card.ejs", {weddingdata : data}, (err, ejstemplate)=>{

                    if(err) return res.send({
                        success : false,
                        message : err.message
                    })


                    var transport = nodemailer.createTransport({
                        host: "smtp.mailtrap.io",
                        port: 2525,
                        auth: {
                          user: "4e536e1dba59a1",
                          pass: "e023c174ef3402"
                        }
                      });
            
                      let mailOptions = {
                          from : senderemail,
                          to : req.body.email,
                          replyTo : senderemail,
                          subject  : "Wedding Invitation",
                          text : "",
                          html : ejstemplate
                      }
        
                      transport.sendMail(mailOptions, (err, info) => {
                          if(err) return res.send({
                              success : false,
                              message : err.message
                          })
        
        
                          return res.send({
                              success : true,
                              message : "Mail Sent",
                              invitationdata : invitationdata
                          })
                      })
                })
                
            })

        })

       })


    }

    getInvitations(req, res){
        invitation.find({weddingid : req.body.weddingid}, function(err, invitationdata){
            if(err) return res.send({
                success  : false,
                message : err.message
            })

            return res.send({
                success : true,
                invitationdata : invitationdata
            })
        })
    }

    addToAlbum(req, res){

        req.files.map(function(item, index){
            
            var imagename = item.filename;

            var imagearray = [];

            imagearray.push(imagename)

            wedding.findByIdAndUpdate(req.body.weddingid,{ $push: { album : { "$each": imagearray }}}, function(err, wedding){
                if(err) return res.send({
                    success : false,
                    message : err.message
                })

              
                var path = "public/images/wedding";
                var dirname =  path + "/" + req.body.weddingid;
                var tmpfilename = "tmp" + imagename;
                var fileExists =  fs.existsSync(dirname);
                
                if (fileExists) {
             
                        fs.rename('public/images/tmp/' + imagename, dirname + "/" + imagename, function(err){
                            if(err) return res.status(400).send(err.message)
                            if(index == (imagearray.length - 1)){
                                return res.status(200).send({
                                    success: true,
                                    message : "Uploaded"
                                });
                            }
                            
                        })
                   
                 }
                 else{
                  mkdirectory(dirname).then(function(){

                         fs.rename('public/images/tmp/' + imagename, dirname + "/" + imagename, function(err){
                             if(err) return res.status(400).send(err.message)
                             if(index == (imagearray.length - 1)){
                                return res.status(200).send({
                                    success: true,
                                    message : "Uploaded"
                                });
                            }
                         })
                                
                 })
                 }
            })
        })
    }

    deleteAlbum(req, res){
        
        wedding.findByIdAndUpdate(req.body.weddingid, {$pull : {album : req.body.image}}, function(err, data){
            if(err) return res.send({
                success : false,
                message : err.message
            })

            wedding.findById(req.body.weddingid, function(err, data){
                if(err) return res.send({
                    success : false,
                    message : err.message
                })
                
                return res.send({
                    success : true,
                    album : data.album
                })
            })
        })
    }


    deleteWedding(req, res) {
        wedding.findByIdAndDelete(req.params.weddingid, function(err, data){
            if(err) return res.send({
                success: false,
                message : err.message
            })

            invitation.deleteMany({weddingid : req.params.weddingid}, function(err, deleted){
                if(err) return res.send({
                    success: false,
                    message : err.message
                })
                
                booking.deleteMany({weddingid : req.params.weddingid}, function(err, deletedata){
                    if(err) return res.send({
                        success: false,
                        message : err.message
                    })
        
                    return res.send({
                        success : true,
                        message : "Wedding Deleted",
                        
                    })
                  })
            });

        
        })
    }

    
}

module.exports = WeddingController;
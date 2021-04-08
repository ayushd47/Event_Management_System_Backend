const comment = require('../models/Comment');
const reply = require("../models/Reply");
const User = require("../models/User")

class CommentsController{

    addComments(req, res){

        console.log(req.body)
        comment.create({
            userid : req.user._id,
            venueid : req.body.venueid,
            comment : req.body.comment

        }, function(err, commentdata){
            if(err) return res.send({
                success : false,
                message : err.message
            })

            comment.find({venueid : req.body.venueid}).populate("userid replies.id").exec(function(err, data){

                User.populate(data, {
                    path: 'replies.id.userid',
                    
                  }, function(err, data){
                    return res.json({
                        success : true,
                        comments : data
                    });
                  });
                
            
            })

          
        })
    }


    getCommentByVenue(req, res){

        comment.find({venueid : req.body.venueid}, function(err, comments){
            if(err) return res.send({
                success : false,
                message : err.message
            })
                if(!comments) return res.send({
                    success : false,
                    message : "No Comments"
                })

            comment.find({venueid : req.body.venueid}).populate("userid replies.id").exec(function(err, data){

                User.populate(data, {
                    path: 'replies.id.userid',
                    
                  }, function(err, data){
                    return res.json({
                        success : true,
                        comments : data
                    });
                  });
                
            
            })
               

        })
    }

    destroyComment(req, res){
    
        comment.findOneAndDelete({_id : req.body.commentId}, function(err, comments){

            reply.deleteMany({commentid : req.body.commentId});
            
            comment.find({venueid : req.body.venueid}, function(err, comments){
                if(err) return res.send({
                    success : false,
                    message : err.message
                })
                    if(!comments) return res.send({
                        success : false,
                        message : "No Comments"
                    })
    
                    comment.find({venueid : req.body.venueid}).populate("userid replies.id").exec(function(err, data){

                        User.populate(data, {
                            path: 'replies.id.userid',
                            
                          }, function(err, data){
                            return res.json({
                                success : true,
                                comments : data
                            });
                          });
                        
                    
                    })
                   
    
            })
        })
    }
    
    addReply(req, res){
        reply.create({
            userid : req.user._id,
            commentid : req.body.commentId,
            venueid : req.body.venueid,
            reply : req.body.reply

        }, function(err, replydata){
            if(err) return res.send({
                success : false,
                message : err.message
            })

            var replyarray = {
                id : replydata._id
            }

             
            comment.findByIdAndUpdate(replydata.commentid, {$push : {replies : replyarray}}, function(err, data){
                if(err) return res.send({
                            success : false,
                            message : err.message
                        })
                      
          reply.find({venueid : req.body.venueid, commentid : data._id}).populate("userid").exec(function(err, data){
                            if(err) return res.send({
                                success : false,
                                message : err.message
                            })
            
                            return res.json({
                                success : true,
                                reply : data
                            });
               })
            })


           
        })
    }
}

module.exports = CommentsController;
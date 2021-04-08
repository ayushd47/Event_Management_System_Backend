const booking = require('../models/Booking');
const wedding = require('../models/Wedding');
const business = require('../models/Business');

class BookingsController{


    addBookings(req, res){
       
        if(req.body.type == "venue"){
            booking.findOne({weddingid : req.body.weddingid, venueid : req.body.venueid}, function(err, data){
                if(err) return res.send({
                    success : false,
                    message : err.message
                })
    
                if(!data){
                    booking.create({
                        weddingid : req.body.weddingid,
                        venueid : req.body.venueid,
                        date : req.body.date,
                        type : req.body.type
                    }, function(err, bookingdata){

                     
                        wedding.findByIdAndUpdate(bookingdata.weddingid, {weddingVenue : bookingdata.venueid}, function(err){
                            if(err) return res.send({
                                success : false,
                                message : err.message
                            }) 

                            return res.send({
                                success : true,
                                message : "Booking Completed",
                                bookingdate : req.body.date
                                
                            })
                        });

                    })
                }else{
                    return res.send({
                        success : true,
                        message : "You Have Already Booked This Venue",
                        bookingdate : "", 
                    })
                }
            })
           
        }else if(req.body.type == "business"){
            booking.findOne({weddingid : req.body.weddingid, businessid : req.body.businessid}, function(err, data){
                if(err) return res.send({
                    success : false,
                    message : err.message
                })
    
                if(!data){
                    booking.create({
                        weddingid : req.body.weddingid,
                        businessid : req.body.businessid,
                        type : req.body.type,
                        date : req.body.date,
                    }, function(err, bookingdata){

                        business.findById(bookingdata.businessid ,function(err, business){

                            if(err) return res.send({
                                success : false,
                                message : err.message
                            })
 
                            if(business.businesstype == "Photography"){
                                wedding.findByIdAndUpdate(bookingdata.weddingid, {weddingPhotography : business._id}, function(err){
                                    if(err) return res.send({
                                        success : false,
                                        message : err.message
                                    }) 
        
                                })
                            }else if(business.businesstype == "Bakery"){
                                wedding.findByIdAndUpdate(bookingdata.weddingid, {weddingBakery : business._id}, function(err){
                                    if(err) return res.send({
                                        success : false,
                                        message : err.message
                                    }) 
        
                                })
                            }else if(business.businesstype == "Beauty Parlor"){
                                wedding.findByIdAndUpdate(bookingdata.weddingid, {weddingMakeup : business._id}, function(err){
                                    if(err) return res.send({
                                        success : false,
                                        message : err.message
                                    }) 
        
                                })
                            }
                        })

                        return res.send({
                            success : true,
                            message : "Booking Completed",
                            bookingdate : bookingdata.date
                        })


                    })
                }else{
                    return res.send({
                        success : true,
                        message : "You Have Already Booked This Business",
                        bookingdate : "",
                    })
                }
            })
           
        }
        
    }


    deleteBookingsVenue(req, res){

        console.log(req.body);

        wedding.findByIdAndUpdate(req.body.weddingid, {$unset: {weddingVenue: 1 }}, function(err, data){
            if(err) return res.send({
                success : false,
                message : err.message
            })
            booking.findOneAndDelete({weddingid : req.body.weddingid, venueid : req.body.venueid}, function(err,data){
                if(err) return res.send({
                    success : false,
                    message : err.message
                })
    
               
                return res.send({
                    success : true,
                    
                })
             
            })
           

        })
     
    }
     deleteBookingsBusiness(req, res){


        business.findById(req.body.businessid, function(err, data){
            if(err) return res.send({
                success : false,
                message : err.message
            })

            booking.findOneAndDelete({weddingid : req.body.weddingid, businessid : req.body.businessid}, function(err,data){
                if(err) return res.send({
                    success : false,
                    message : err.message
                })
                return res.send({
                    success : true,
                    message : "Bookings Deleted"
                })
            })

            if(data.businesstype == "Photography"){
                wedding.findByIdAndUpdate(req.body.weddingid,{$unset: {weddingPhotography: 1 }} , function(err, data){
                    if(err) return res.send({
                        success : false,
                        message : err.message
                    })

                 

                })
            }else if(data.businesstype == "Bakery"){
                wedding.findByIdAndUpdate(req.body.weddingid,{$unset: {weddingBakery: 1 }} , function(err, data){
                    if(err) return res.send({
                        success : false,
                        message : err.message
                    })

                })

            }else if(data.businesstype == "Makeup"){
                wedding.findByIdAndUpdate(req.body.weddingid,{$unset: {weddingMakeup: 1 }} , function(err, data){
                    if(err) return res.send({
                        success : false,
                        message : err.message
                    })

                })

            }

        })
      
    }
  
    
}


module.exports = BookingsController
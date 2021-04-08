const express = require('express');
const router = express.Router();
const venueController = require("../controller/venueController");
const usersController = require("../controller/usersController");
const commentsController = require("../controller/commentsController")
const auth = require("../middleware/middleware");
const uploadimage = require("../middleware/uploadVenueImage");
const uploadprofile = require("../middleware/uoloadUserImage");
const businessController = require("../controller/businessController");
const uploadMultiple = require("../middleware/multipleImageUpload");
const weddingController = require("../controller/weddingController");
const bookingsController = require("../controller/bookingsController");

const users = new usersController();
const comments = new commentsController();
const venues = new venueController();
const business = new businessController();
const wedding = new weddingController();
const booking = new bookingsController();
 

router.post('/profile', auth.checkUserToken, users.getUsers);
router.post('/addVenue',  [auth.checkVendorToken, uploadimage], venues.addVenues);
router.get('/getVenues', venues.getVenues);
router.post('/getVenueById' , venues.getVenuesById);
router.get('/getVenuesByVendor', auth.checkVendorToken, venues.getVenuesByVendor);
router.post('/rateVenue', auth.checkUserToken, venues.rateVenues);
router.put('/updateUser', auth.checkUserToken, users.updateUser);
router.delete('/deleteUser', auth.checkUserToken, users.deleteUser);



router.post('/addComment', auth.checkUserToken, comments.addComments);
router.post('/getComments', comments.getCommentByVenue);
router.delete('/deleteComment', auth.checkUserToken, comments.destroyComment);

router.post('/updateProfileImage', [auth.checkUserToken,uploadprofile], users.uploadImage);

router.post('/getRatingAvg', venues.getRatingAvg);
router.post('/getRatingByUser', auth.checkUserToken, users.getRatings);
router.post('/addReply', auth.checkUserToken, comments.addReply);


router.get('/getVenuesByLocation/:location', venues.getVenuesByLocation);
router.post('/getVenuesBySearch', venues.getVenuesBySearch);
router.post('/addAvailableDates', venues.addAvailableDates);

router.post('/addBusiness',  [auth.checkVendorToken, uploadimage], business.addBusiness);
router.get('/getBusinessByVendor', auth.checkVendorToken, business.getBusinessByVendor);
router.post('/getBusinessByCategory', business.getBusinessByCategory);
router.post('/getBusinessByLocation', business.getBusinessByLocation);
router.post('/getBusinessById', business.getBusinessById);
router.post('/addToBusinessAlbum', [auth.checkVendorToken,uploadMultiple], business.addToAlbum);
router.post('/addAvailableDatesBusiness', business.addAvailableDates);

router.post('/addToAlbum', [auth.checkVendorToken,uploadMultiple], venues.addToAlbum);
router.get('/getTopVenues', venues.getTopVenues);

router.post('/registerWedding', auth.checkUserToken, wedding.addWedding);
router.get('/getWeddingsByUser', auth.checkUserToken, wedding.getWeddingsByUser);
router.post('/getWedding', auth.checkUserToken, wedding.getWedding);
router.delete('/deletewedding/:weddingid', auth.checkUserToken, wedding.deleteWedding);

router.post('/getVenueDates', auth.checkUserToken, venues.getDates);
router.post('/getBusinessDates', auth.checkUserToken, business.getDates);

router.post('/addBooking', auth.checkUserToken, booking.addBookings);
 
router.post('/deleteBookingsBusiness', auth.checkUserToken, booking.deleteBookingsBusiness) 
router.post('/deleteBookingsVenue', auth.checkUserToken, booking.deleteBookingsVenue)


router.delete('/deleteAlbumFromVenue', auth.checkVendorToken, venues.deleteAlbum);
router.delete('/deleteAlbumFromBusiness', auth.checkVendorToken, business.deleteAlbum);

router.post('/addInvitation', auth.checkUserToken, wedding.addInvitaion);
router.post('/getInvitations', auth.checkUserToken, wedding.getInvitations);

router.post('/getVendor', auth.checkVendorToken, users.getVendor);
router.put('/updateVendor', auth.checkVendorToken, users.updateVendor);
router.delete('/deleteVendor', auth.checkVendorToken, users.deleteVendor);


router.put('/updateVenue', auth.checkVendorToken, venues.updateVenue);
router.put('/updateBusiness', auth.checkVendorToken, business.updateBusiness);


router.get('/getBookingsByVendor', auth.checkVendorToken, venues.getBookingsByVendor);

router.post('/addToWeddingAlbum', [auth.checkUserToken,uploadMultiple], wedding.addToAlbum);
router.delete('/deleteAlbumWedding', auth.checkUserToken, wedding.deleteAlbum);

router.get('/getBookings',auth.checkVendorToken, venues.getBookings);
router.get('/getBusinessBookings',auth.checkVendorToken, business.getBookings);

module.exports = router;
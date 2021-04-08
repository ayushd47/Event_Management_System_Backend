
const User = require("../models/User");
const mongoose = require("mongoose");

//Connecting to the mongoose database before testing 
beforeAll(async () => {
    await mongoose.connect('mongodb://localhost:27017/WeddingPlanner',{
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true
      });
      
})

//Closing connection after the testing is done
afterAll(async () => {
    await mongoose.connection.close();
})


//test for users functionalities
describe("User Schema Test", () => {

    // Adding User Testing 
        it('Adding New User', () => {
           const user = {
               "firstname" : "Sadikshya",
               "lastname" : "Pandey",
               "email" : "Sadikshya@gmail.com",
               "location" : "kathmandu",
               "phonenumber" : "9877383938",
               "password"  : "password"
           };

           return User.create(user)
            .then((userdata) => {
                expect(userdata.firstname).toEqual("Sadikshya")
            })

        })


        //user delete testing
    // it('Testing the delete user ', async () => {
    //     const status = await User.deleteMany();
    //     expect(status.ok).toBe(1);
    // });


    //Testing Update User
    // it('Testing the user find', async() => {
        

    //     return User.findOne({firstname : "Sadikshya"})
    //     .then((userdata)=>{
    //         expect(userdata.firstname).toEqual('Sadikshya')
    //     })

    // });

});



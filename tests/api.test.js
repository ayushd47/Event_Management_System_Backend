const usersController = require("../controller/usersController");

const mongoose = require("mongoose");


const users = new usersController();

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


describe("User API Test", () => {
    it('should load user data', () => {
        return users.testFunction({firstname : "Amanda"}, (data) => { 
          expect(data.data.firstname).toEqual('Amanda')
        })
      })

});


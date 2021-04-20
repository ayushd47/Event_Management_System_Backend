const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/WeddingDB',{
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});


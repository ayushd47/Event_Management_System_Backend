const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/WeddingPlanner',{
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});


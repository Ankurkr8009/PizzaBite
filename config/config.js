const mongoose = require("mongoose");
require("colors");

const connectDB = async () => {
  try {
    const url = "mongodb+srv://ankurk8k9:QTxqLAOL70jkazmT@cluster0.yzix68j.mongodb.net/pizza_app?retryWrites=true&w=majority";
    const conn = await mongoose.connect(url, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    });
    console.log(
      `Mongodb DataBase Connected!`
    );
  } catch (error) {
    console.log(`error: ${error.message}`.bgRed.white);
  }
};

module.exports = connectDB;



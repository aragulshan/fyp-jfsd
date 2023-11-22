const mongoose = require("mongoose");

const connectMongo = async () => {
  try {
    mongoose.connect(process.env.MONGO_DB_URI);
    console.log("DB connected successfully");
  } catch (err) {
    console.log("DB connection error", err);
  }
};

module.exports = { connectMongo };

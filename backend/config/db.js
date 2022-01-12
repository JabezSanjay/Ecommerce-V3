const mongoose = require('mongoose');

const connectWithDb = async () => {
  try {
    const db = await mongoose.connect(process.env.DATABASE, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB connected: ${db.connection.host}`);
  } catch (error) {
    console.log(`MongoDB connection error: ${error}`);
    process.exit(1);
  }
};

module.exports = connectWithDb;

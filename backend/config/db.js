import mongoose from "mongoose";

// this in theory returns a promise so you could do a .catch syntax or async await
// if the promise is successful then the console.log() in the try block runs
// If it is not, then the catch block runs with the error message and the error
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;

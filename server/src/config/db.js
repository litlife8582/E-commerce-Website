import mongoose from "mongoose";


//mongoose.connect returns a promise hence we use an async function
const connectDB = async () => {
  try {
    mongoose.set("strictQuery", true);

    const conn = await mongoose.connect(process.env.MONGODB_URI, {
        
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);//Log success incase DB is connected
  } catch (error) {
    console.error("MongoDB connection error:", error.message);//Log error incase BD fails to connect
    process.exit(1);
  }
};

export default connectDB;

import mongoose from "mongoose";
import dotEnv from "dotenv";
dotEnv.config(); // allow .env file to load

const connectDb = async () => {
  try {
    // console.log(`from--`, process.env.MONGO_URI);
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      dbName: process.env.DB_NAME,
    });
    console.log(`MongoDb Connected ${conn.connection.host} `);
  } catch (error) {
    console.log(`Error ${error.message}`);
    process.exit(1);
  }
};

export default connectDb;

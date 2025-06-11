
const mongoose=require('mongoose'); 

const dbUrl = process.env.DB_URL;
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL).then((data) => {
      console.log(
        `Database connected successfully with ${data.connection.host}!`
      );
    });
  } catch (error) {
    console.log(error.message);
    setTimeout(connectDB, 5000);
  }
};

module.exports=connectDB;

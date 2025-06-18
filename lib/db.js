import mongoose from "mongoose";

export const connectDb = () => {
    mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() =>{
  
  console.log("Connected to MongoDB Atlas")
  console.log("📦 DB Name:", mongoose.connection.name);
}
)
.catch((err) => console.error("MongoDB connection error:", err));
}

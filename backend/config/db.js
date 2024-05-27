import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://dishankagrawal888:aUedlUYVyjSMlyCm@cluster0.tfdwf38.mongodb.net/Zwiggy').then(()=>console.log("DataBase Connected"));
}
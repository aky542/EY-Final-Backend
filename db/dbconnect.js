import mongoose from "mongoose";

const dbUrl = "mongodb+srv://kanjikuzhysatheesan:Akhil123@cluster0.gksirrt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";


const connectDb = async() => {
    try{
        await mongoose.connect(dbUrl,{useNewUrlParser: true, useUnifiedTopology: true});
        console.log("Connected to the db");
    }
    catch(error)
    {
        console.error("Failed to start the server:", error.message);
    }
}

export default connectDb;
import express from "express";
import connectDb from "./db/dbconnect.js";
import userrouter from "./routes/user-routes.js";
import cors from "cors"
import blogrouter from "./routes/blog-routes.js";

const app = new express();
 app.use(cors());


app.use(express.json());

app.use('/user',userrouter);
app.use('/blog',blogrouter);
 
const startServer = async() =>{
try{
        await app.listen(5500,
            console.log("Connected to server"));
        connectDb();
}
catch(error){
    console.log(error);
}

}

startServer();


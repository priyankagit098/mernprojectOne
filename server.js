
import "express-async-errors";
import express from "express";

import mongoose from "mongoose";
import dotenv from "dotenv";

import connectDB from "./config/dbConfig.js";

// router

import authRouter from "./routes/authRoutes.js"
import jobsRouter from "./routes/jobsRoutes.js"


// middleware
import notFoundMiddleware from "./middleware/notFound.js";
import errorHandleMiddleware from "./middleware/errorHandle.js";

const app = express();

dotenv.config();

// app.use(cors("*"));

// const user = require("./routes/usersRoute")


app.use(express.json());
app.use(express.urlencoded());



app.get("/api/v1", (req, res) => {
    res.json({msg:"Welcome"});
})

app.use("/api/v1/auth", authRouter)
app.use("/api/v1/jobs", jobsRouter)

app.use(notFoundMiddleware);

app.use(errorHandleMiddleware)




// app.use("/api", user);

const port = process.env.PORT || 5000;
app.get("/", (req, res) => {
    console.log("Welcome");
})



const  start = async () => {
    try {
        await connectDB(process.env.MONGO_URL)
        app.listen(port, ()=> {
            console.log(`Server started on port ${port}`);
        })
    
    } catch (error) {
        console.log(error);
    }
}

start()

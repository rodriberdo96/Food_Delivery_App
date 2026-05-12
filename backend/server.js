import express from "express"
import cors from "cors"
import mongoose from "mongoose"
import { connectDB } from "./config/db.js"
import foodRouter from "./routes/foodRoute.js"
import userRouter from "./routes/userRouter.js"
import 'dotenv/config'
import cartRouter from "./routes/cartRoute.js";
import orderRouter from "./routes/orderRoute.js";

// app config
const app= express()
const port= process.env.PORT || 4000

// middleware
app.use(express.json())
app.use(cors())

// API endpoint
app.use("/api/food",foodRouter)
app.use("/images", express.static('uploads'))
app.use ("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

app.get("/",(req,res)=>{
    res.send("API Working")
})

const startServer = async () => {
    try {
        await connectDB();
        app.listen(port,()=>{
            console.log(`Server Started on http://localhost:${port}`)
        })
    } catch (error) {
        console.error(error.message);
        process.exit(1);
    }
};

process.on("SIGTERM", async () => {
    await mongoose.connection.close();
    process.exit(0);
});

startServer();

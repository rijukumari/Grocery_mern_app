import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/conn.js";
import cors from "cors";
import  cookieParser from 'cookie-parser';
import userRouter from './routes/user.routes.js';
import sellerRouter from './routes/seller.route.js';
import productRouter from './routes/product.route.js'
import cartRouter from './routes/cart.route.js';
import orderRouter from './routes/order.route.js';
import addressRouter from './routes/address.route.js'
import { connectCloudinary } from "./db/cloudinary.js";

const app = express();
dotenv.config();
connectCloudinary()
const allowedOrigins = ["http://localhost:5173"];

app.use(express.json());
app.use(cors({
  origin: allowedOrigins, credentials:true
}));
app.use(cookieParser());

app.use('/images', express.static("uploads"));
app.use('/api/user', userRouter)
app.use('/api/seller', sellerRouter);
app.use('/api/product', productRouter);
app.use('/api/cart', cartRouter);
app.use('/api/order', orderRouter);
app.use('/api/address', addressRouter);

const port = process.env.PORT;

app.get("/", (req, res) => {
  res.send("Hello Wrold");
});

app.listen(port, () => {
  connectDB();
  console.log(`Server is running at http://localhost:${port}`);
});

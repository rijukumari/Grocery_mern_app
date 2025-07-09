import express from "express";
import dotenv from "dotenv";
import connectDB from "./src/db/conn.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRouter from "./src/routes/user.routes.js";
import sellerRouter from "./src/routes/seller.route.js";
import productRouter from "./src/routes/product.route.js";
import cartRouter from "./src/routes/cart.route.js";
import orderRouter from "./src/routes/order.route.js";
import addressRouter from "./src/routes/address.route.js";
import { connectCloudinary } from "./src/db/cloudinary.js";

const app = express();
dotenv.config();
connectCloudinary();

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use("/images", express.static("uploads"));
app.use("/api/user", userRouter);
app.use("/api/seller", sellerRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);
app.use("/api/address", addressRouter);

const port = process.env.PORT;

app.get("/", (req, res) => {
  res.send("Hello Wrold");
});

app.listen(port, () => {
  connectDB();
  console.log(`Server is running at http://localhost:${port}`);
});

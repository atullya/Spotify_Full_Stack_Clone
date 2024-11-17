import express from "express";
import cors from "cors";
import "dotenv/config";
import songRouter from "./src/routes/songRoute.js";
import connectDB from "./src/config/mongoDb.js";
import connectCloudinary from "./src/config/cloudinary.js";
import albumRouter from "./src/routes/albumRoute.js";

//app config

const app = express();
const PORT = process.env.PORT || 4000;

//connect db
connectDB();
connectCloudinary();

//middleware

app.use(express.json());
app.use(cors());

//initialize routes
app.use("/api/song", songRouter);
app.use("/api/album",albumRouter)
app.get("/", (req, res) => {
  res.send("hello");
});
app.listen(PORT, () => {
  console.log(`Server Running on PORT ${PORT}`);
});

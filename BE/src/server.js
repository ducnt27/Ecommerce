import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import express from "express";
import { createServer } from "http";
import { connectDB } from "./config/db.js";
import router from "./routes/index.js";
import cors from "cors";
import STATUS from "./utils/status.js";
import morgan from "morgan";
dotenv.config();
const app = express();
const server = createServer(app);
// Cấu hình CORS
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
    methods: "GET, POST, OPTIONS, PUT, PATCH, DELETE",
    allowedHeaders: ["X-Requested-With", "Content-Type", "Authorization"],
    preflightContinue: true,
  })
);
// Xử lý các yêu cầu OPTIONS
app.options("*", cors());
// cấu hình req
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(morgan("tiny"));
console.log("url", process.env.CLIENT_URL);

app.use(cookieParser());

connectDB();

app.use("/api/v1", router);

app.use("*", (req, res) => {
  res.status(STATUS.BAD_REQUEST).json({
    message: "Đường dẫn không đúng",
    path: req.baseUrl,
  });
});
server.listen(process.env.PORT, () => {
  console.log(`listening listening http://localhost:${process.env.PORT}`);
});

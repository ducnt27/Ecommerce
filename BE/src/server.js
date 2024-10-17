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
console.log("url", process.env.CLIENT_URL);
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    credentials: true, // Cho phép gửi cookie, thông tin xác thực
    methods: "GET, POST, OPTIONS, PUT, PATCH, DELETE",
    allowedHeaders: ["X-Requested-With", "Content-Type", "Authorization"],
  })
);
// Xử lý các yêu cầu OPTIONS (Preflight)
// Cấu hình req
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(morgan("tiny"));

app.use(cookieParser());

// Kết nối cơ sở dữ liệu
connectDB();

// Định tuyến API
app.use("/api/v1", router);

// Xử lý các yêu cầu không đúng đường dẫn
app.use("*", (req, res) => {
  res.status(STATUS.BAD_REQUEST).json({
    message: "Đường dẫn không đúng",
    path: req.baseUrl,
  });
});

// Lắng nghe server
server.listen(process.env.PORT, () => {
  console.log(`Server đang chạy tại http://localhost:${process.env.PORT}`);
});

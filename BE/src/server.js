import cookieParser from "cookie-parser";
import dotenv from 'dotenv';
import express from 'express';
import { createServer } from 'http';
import { connectDB } from './config/db.js';
import router from "./routes/index.js";

dotenv.config();
const app = express();
const server = createServer(app);

// cấu hình req
app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    })
);
app.use(cookieParser());

connectDB();

app.use("/api/v1", router);
server.listen(process.env.PORT, () => {
    console.log(`listening listening http://localhost:${process.env.PORT}`);
});

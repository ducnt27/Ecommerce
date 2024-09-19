import express from 'express';
import { createServer } from 'http';
import dotenv from 'dotenv'
import cookieParser from "cookie-parser";

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



server.listen(process.env.PORT, () => {
    console.log(`listening listening http://localhost:${process.env.PORT}`);
});

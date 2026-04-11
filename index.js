import 'dotenv/config';
import express from "express";
import cookieParser from 'cookie-parser';
import Get from "./routes/get.route.js";
import Post from "./routes/post.route.js";
import { verifyAdminToken } from './middleware/admin.js';

const app = express();
const port = process.env.PORT || 5000;

app.use(express.static("public"));
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

app.use(Get);
app.use(verifyAdminToken);
app.use(Post);

app.listen(port, () => {
    console.log(`server is running on port ${port}`)
})
import express from "express";
import multer from "multer";
import { chooseCountry, createAdmin, createInfo, deleteBlog, deleteInfo, loginAdmin, logoutAdmin, postBlog, updateBlog, updateInfo } from "../controller/post.controller.js";

const router = express();

const storage = multer.memoryStorage();

export const upload = multer({storage});

router.post("/create/admin", createAdmin);
router.post("/login/admin", loginAdmin);
router.post("/logout/admin", logoutAdmin);
router.post("/post/blog", upload.single("image"), postBlog);
router.post("/choose/country", chooseCountry);
router.post("/update/:id/blog/", upload.single("image"), updateBlog);
router.post("/delete/blog/:id/:country/:category/:date", deleteBlog);
router.post("/delete/site/info/:id/:category", deleteInfo);

router.post("/create/site/info", createInfo);
router.post("/update/site/info/:id", updateInfo);

export default router; 
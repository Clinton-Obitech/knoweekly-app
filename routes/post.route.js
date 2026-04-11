import express from "express";
import multer from "multer";
import { chooseCountry, createAdmin, deleteBlog, loginAdmin, logoutAdmin, postBlog, updateBlog } from "../controller/post.controller.js";

const router = express();

const storage = multer.memoryStorage();

export const upload = multer({storage});

router.post("/create/admin", createAdmin);
router.post("/login/admin", loginAdmin);
router.post("/logout/admin", logoutAdmin);
router.post("/post/blog", upload.single("image"), postBlog);
router.post("/choose/country", chooseCountry);
router.post("/update/:id/blog/", upload.single("image"), updateBlog);
router.post("/delete/blog/:id", deleteBlog);

export default router; 
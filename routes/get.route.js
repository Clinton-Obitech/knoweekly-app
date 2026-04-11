import express from "express";
import { AdminDashboard, AdminHome, CreateAdmin, EditBlog, Home, LoginAdmin, ManageBlog, PostBlog, UKblog, USblog} from "../controller/get.controller.js";
import { verifyAdminToken } from "../middleware/admin.js";

const router = express();

router.get("/", Home);
router.get("/admin", AdminHome);
router.get("/usa/blog/:category", USblog);
router.get("/uk/blog/:category", UKblog)
router.get("/create/admin", CreateAdmin);
router.get("/login/admin", LoginAdmin);
router.get("/admin/dashboard", verifyAdminToken, AdminDashboard);
router.get("/post/blog", verifyAdminToken, PostBlog);
router.get("/manage/blog", verifyAdminToken, ManageBlog);
router.get("/edit/blog/:id", verifyAdminToken, EditBlog);

export default router;
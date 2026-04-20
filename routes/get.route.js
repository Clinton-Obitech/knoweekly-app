import express from "express";
import { AdminDashboard, AdminHome, AUblog, CAblog, CreateAdmin, CreateInfo, EditBlog, EditInfo, Home, LoginAdmin, ManageBlog, PostBlog, SiteInfo, UKblog, USblog} from "../controllers/get.controller.js";
import { verifyAdminToken } from "../middleware/admin.js";

const router = express();

router.get("/", Home);
router.get("/admin", AdminHome);
router.get("/usa/blog/:category", USblog);
router.get("/uk/blog/:category", UKblog);
router.get("/ca/blog/:category", CAblog);
router.get("/au/blog/:category", AUblog);
router.get("/create/admin", CreateAdmin);
router.get("/login/admin", LoginAdmin);
router.get("/admin/dashboard", verifyAdminToken, AdminDashboard);
router.get("/post/blog", verifyAdminToken, PostBlog);
router.get("/manage/blog", verifyAdminToken, ManageBlog);
router.get("/edit/blog/:id", verifyAdminToken, EditBlog);

router.get("/create/site/info", verifyAdminToken, CreateInfo);
router.get("/site/info/:category", verifyAdminToken, SiteInfo);
router.get("/edit/site/info/:id", verifyAdminToken, EditInfo);

export default router;
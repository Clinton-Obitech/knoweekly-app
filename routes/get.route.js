import express from "express";
import { About, AdminDashboard, AdminHome, AUblog, CAblog, Contact, CreateAdmin, CreateInfo, EditBlog, EditInfo, Home, LoginAdmin, ManageBlog, Policy, PostBlog, SearchAU, SearchCA, SearchUK, SearchUSA, SiteInfo, Terms, UKblog, USblog} from "../controllers/get.controller.js";
import { verifyAdminToken } from "../middleware/admin.js";

const router = express();

router.get("/", Home);
router.get("/about/us", About);
router.get("/contact/us", Contact);
router.get("/terms/conditions", Terms);
router.get("/privacy/policy", Policy);
router.get("/usa/blog/:category", USblog);
router.get("/usa/search", SearchUSA);
router.get("/uk/search", SearchUK);
router.get("/au/search", SearchAU);
router.get("/ca/search", SearchCA);
router.get("/uk/blog/:category", UKblog);
router.get("/ca/blog/:category", CAblog);
router.get("/au/blog/:category", AUblog);

router.get("/admin", AdminHome);
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
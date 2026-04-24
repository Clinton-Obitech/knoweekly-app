import express from "express";
import multer from "multer";
import { createAdminController, loginAdminController, logoutAdmin } from "../controllers/admin/auth/controller.js";
import { postBlogController, updateBlogController, deleteBlogController, manageByQueryController } from "../controllers/admin/blogs/controller.js";
import { createInfoController, deleteInfoController, updateInfoController } from "../controllers/admin/site-info/controller.js";
import { MessageController } from "../controllers/user/message/controller.js";
import { searchAUblogsController, searchCAblogsController, searchUKblogsController, searchUSblogsController } from "../controllers/searchBlogs/controller.js";

const router = express();

const storage = multer.memoryStorage();

export const upload = multer({storage});

router.post("/send/message", MessageController);

router.post("/create/admin", createAdminController);
router.post("/login/admin", loginAdminController);
router.post("/logout/admin", logoutAdmin);

router.post("/post/blog", upload.single("image"), postBlogController);
router.post("/manage/query", manageByQueryController);
router.post("/update/:id/blog/", upload.single("image"), updateBlogController);
router.post("/delete/blog/:id/:country/:category/:date", deleteBlogController);

router.post("/create/site/info", createInfoController);
router.post("/update/site/info/:id", updateInfoController);
router.post("/delete/site/info/:id/:category", deleteInfoController);

router.post("/search/usa/", searchUSblogsController);
router.post("/search/uk/", searchUKblogsController);
router.post("/search/au/", searchAUblogsController);
router.post("/search/ca/", searchCAblogsController);


export default router; 
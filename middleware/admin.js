import jwt from "jsonwebtoken";

export const verifyAdminToken = (req, res, next) => {

    const adminToken = req.cookies.adminToken;

    if (!adminToken) {
        return res.redirect("/")
    }

    try {
        const decoded = jwt.verify(adminToken, process.env.JWT_SECRET);
        req.admin = decoded;
        next();
    } catch (err) {
        console.error(err)
        return res.redirect("/")
    }
}
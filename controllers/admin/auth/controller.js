import jwt from "jsonwebtoken";
import { createAdmin } from "../../../service/admin/auth/create.js";
import { loginAdmin } from "../../../service/admin/auth/login.js";

export const createAdminController = async (req, res) => {

    const result = await createAdmin(req.body);

    try {

        if (!result.success) {
            return res.render("create-admin.ejs", {
                error: result.error
            })
        } else {
            return res.redirect(`/login/admin?message=${result.message}`);
        }

    } catch (err) {

        console.error(err);
        return res.redirect(`/create/admin?error=something went wrong`);

    }
}

export const loginAdminController = async (req, res) => {

    const result = await loginAdmin(req.body);

    try {

        if (!result.success) {
            return res.render("login-admin.ejs", {
                error: result.error
            })
        } else {

        const adminToken = jwt.sign(
            {id: result.admin.id},
            process.env.JWT_SECRET,
            {expiresIn: "1d"}
        );

        res.cookie("adminToken", adminToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax"
        });

        return res.redirect("/admin/dashboard");

        }
    } catch (err) {

        console.error(err);
        return res.redirect(`/login/admin?error=something went wrong`);

    }

}

export const logoutAdmin = (req, res) => {
    try {

        res.clearCookie("adminToken", {
            httpOnly: true,
            secure: true,
            sameSite: "none"
        });
        return res.redirect("/admin");

    } catch (err) {
        console.error(err);
    }
}
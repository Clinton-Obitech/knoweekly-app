import { getAdmin } from "../lib/admin.js";
import { getUSABlogs, getUKBlogs, queryUSABlogs, queryUKBlogs } from "../lib/blogs.js";
import pool from "../lib/db.js";
import supabase from "../lib/supabase.js";

export const Home = (req, res) => {
    res.render("index.ejs")
}

export const AdminHome = (req, res) => {
    res.render("admin.ejs")
}

export const CreateAdmin = (req, res) => {
    const message = req.query.message;

    res.render("create-admin.ejs", {message})
}

export const LoginAdmin = (req, res) => {
    const message = req.query.message;

    res.render("login-admin.ejs", {message})
}

export const AdminDashboard = async (req, res) => {

    const admin = await getAdmin(req.admin.id);

    res.render("admin-dashboard.ejs", {
        username: admin.username
    })
}

export const PostBlog = (req, res) => {
    const message = req.query.message;

    res.render("post-blog.ejs", {
        editBlog: null,
        message
    })
}

export const ManageBlog = (req, res) => {
    res.render("manage-blog.ejs", {
        blogs: null
    })
}

export const EditBlog = async (req, res) => {

    const blogId = req.params.id;

    try {

        const { data, error } = await supabase
        .from("blogs")
        .select("*")
        .eq("id", blogId)
        .single();

        if (error) throw error

        return res.render("post-blog.ejs", {
            editBlog: data
        })

    } catch (err) {
        console.error(err)
    }
}

export const USblog = async (req, res) => {

    const category = req.params.category;

    if (category === "all") {
    const usaBlogs = await getUSABlogs();

    res.render("usa.ejs", {
        blogs: usaBlogs,
        all: "all"
    });

    } else {
        const usaBlogs = await queryUSABlogs(category);

    res.render("usa.ejs", {
        blogs: usaBlogs,
        all: null
    });
    }
}

export const UKblog = async (req, res) => {

    const category = req.params.category;

    if (category === "all") {
      const ukBlogs = await getUKBlogs();

    res.render("uk.ejs", {
        blogs: ukBlogs,
        all: "all"
    });

    } else {
        const ukBlogs = await queryUKBlogs(category);

    res.render("uk.ejs", {
        blogs: ukBlogs,
        all: null
    });
    }
}
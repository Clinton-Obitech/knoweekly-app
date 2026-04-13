import { getAdmin } from "../lib/admin.js";
import { queryUSABlogs, queryUKBlogs, queryCABlogs, queryAUBlogs } from "../lib/blogs.js";
import { getInfo } from "../lib/info.js";
import supabase from "../lib/supabase.js";

export const Home = async (req, res) => {
    try {
        const { data , error } = await supabase
        .from("site_info")
        .select("*")
        .eq("category", 'home')

        if (error) throw error

        return res.render("index.ejs", {
            information: data
        })
        
    } catch (err) {
        console.error(err)
    }
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

export const EditInfo = async (req, res) => {

    const infoId = req.params.id;

    try {

        const { data, error } = await supabase
        .from("site_info")
        .select("*")
        .eq("id", infoId)
        .single();

        if (error) throw error

        return res.render("create-site-info.ejs", {
            editInfo: data
        })

    } catch (err) {
        console.error(err)
    }
}

export const USblog = async (req, res) => {

    const today = new Date().toISOString().split("T")[0];

    const date = req.query.date || today;

    const category = req.params.category;

    const usaBlogs = await queryUSABlogs(category, date);

    res.render("usa.ejs", {
        blogs: usaBlogs,
        date: date
    });
    
}

export const UKblog = async (req, res) => {

    const today = new Date().toISOString().split("T")[0];

    const date = req.query.date || today;

    const category = req.params.category;

    const ukBlogs = await queryUKBlogs(category, date);

    res.render("uk.ejs", {
        blogs: ukBlogs,
        date: date
    });
    
}

export const CAblog = async (req, res) => {

    const today = new Date().toISOString().split("T")[0];

    const date = req.query.date || today;

    const category = req.params.category;

    const caBlogs = await queryCABlogs(category, date);

    res.render("ca.ejs", {
        blogs: caBlogs,
        date: req.query.date
    });
    
}

export const AUblog = async (req, res) => {

    const today = new Date().toISOString().split("T")[0];

    const date = req.query.date || today;

    const category = req.params.category;

    const auBlogs = await queryAUBlogs(category, date);

    res.render("au.ejs", {
        blogs: auBlogs,
        date: req.query.date
    });
    
}

export const CreateInfo = (req, res) => {

    const message = req.query.message;

    res.render("create-site-info.ejs", {
        message,
        editInfo: null
    })
}

export const SiteInfo = async (req, res) => {
    const category = req.params.category;

    console.log(category)

    const info = await getInfo(category);

    res.render("site-info.ejs", {
        information: info
    })
}
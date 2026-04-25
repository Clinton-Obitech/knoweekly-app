import { getAdmin } from "../lib/admin.js";
import { queryUSABlogs, queryUKBlogs, queryCABlogs, queryAUBlogs} from "../lib/all-blogs.js";
import { messages } from "../lib/messages.js";
import { getSiteInfo } from "../lib/site-info.js";
import supabase from "../lib/supabase.js";
import jwt from "jsonwebtoken";

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

export const About = async (req, res) => {
    try {
        const { data , error } = await supabase
        .from("site_info")
        .select("*")
        .eq("category", 'about')

        if (error) throw error

        return res.render("about.ejs", {
            information: data
        })
        
    } catch (err) {
        console.error(err)
    }
}

export const Contact = async (req, res) => {
    const { message, error } = req.query;
    try {
        const { data , error: cerror } = await supabase
        .from("site_info")
        .select("*")
        .eq("category", 'contact')

        if (cerror) throw cerror

        return res.render("contact.ejs", {
            information: data,
            error,
            message
        })
        
    } catch (err) {
        console.error(err)
    }
}

export const Terms = async (req, res) => {
    try {
        const { data , error } = await supabase
        .from("site_info")
        .select("*")
        .eq("category", 'terms')

        if (error) throw error

        return res.render("terms.ejs", {
            information: data
        })
        
    } catch (err) {
        console.error(err)
    }
}

export const Policy = async (req, res) => {
    try {
        const { data , error } = await supabase
        .from("site_info")
        .select("*")
        .eq("category", 'policy')

        if (error) throw error

        return res.render("policy.ejs", {
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
    const { message, error } = req.query;
    const token = req.cookies.adminToken;

    if (token) {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (decoded) {
        return res.redirect("/admin/dashboard")
      }
    }

    return res.render("login-admin.ejs", {message, error})
}

export const AdminDashboard = async (req, res) => {

    const admin = await getAdmin(req.admin.id);

    const { message, error } = req.query;

    res.render("admin-dashboard.ejs", {
        username: admin.username,
        message,
        error
    })
}

export const PostBlog = (req, res) => {
    const { message, error } = req.query;

    res.render("post-blog.ejs", {
        editBlog: null,
        message,
        error
    })
}

export const ManageBlog = (req, res) => {
    res.render("manage-blog.ejs")
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

export const SearchUSA = (req, res) => {
    res.render("search-usa.ejs", {
        blogs: null
    })
}

export const SearchUK = (req, res) => {
    res.render("search-uk.ejs", {
        blogs: null
    })
}

export const SearchAU = (req, res) => {
    res.render("search-au.ejs", {
        blogs: null
    })
}

export const SearchCA = (req, res) => {
    res.render("search-ca.ejs", {
        blogs: null
    })
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
        date: date
    });
    
}

export const AUblog = async (req, res) => {

    const today = new Date().toISOString().split("T")[0];
    const date = req.query.date || today;
    const category = req.params.category;

    const auBlogs = await queryAUBlogs(category, date);

    res.render("au.ejs", {
        blogs: auBlogs,
        date: date
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

    const admin = await getAdmin(req.admin.id);

    if (admin.role !== "alpha admin") {
        return res.redirect("/admin/dashboard?error=not authorized")
    }

    const category = req.params.category;

    const { error, message } = req.query;

    const info = await getSiteInfo(category);

    res.render("site-info.ejs", {
        information: info,
        error,
        message
    })
}

export const ContactMessages = async (req, res) => {

    const admin = await getAdmin(req.admin.id);

    if (admin.role !== "alpha admin") {
        return res.redirect("/admin/dashboard?error=not authorized")
    }

    const result = await messages();

    try {
        if (!result) {
            return res.render("contact-messages.ejs", {
                messages: null
            })
        }
        return res.render("contact-messages.ejs", {
            messages: result
        })
    } catch (err) {
        console.error
    }
}

export const ReadMessages = async (req, res) => {

    const messageId = req.params.id;

    try {
         const { data, error } = await supabase
         .from("contact_messages")
         .select("*")
         .eq("id", messageId)
         .single()

         if (error) throw error

        return res.render("read-messages.ejs", {
            message: data
        })
    } catch (err) {
        console.error
    }
}
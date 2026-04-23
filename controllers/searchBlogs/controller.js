import { searchUSABlogs, searchUKBlogs, searchAUBlogs, searchCABlogs } from "../../lib/all-blogs.js";

export const searchUSblogsController = async (req, res) => {

    const Blogs = await searchUSABlogs(req.body);
    
    try {
       if (!Blogs) {
        return res.render("search-usa.ejs", {
        blogs: null,
        });
        }

        return res.render("search-usa.ejs", {
        blogs: Blogs,
        });

    } catch (err) {
        console.error(err)
    }
    
}

export const searchUKblogsController = async (req, res) => {

    const Blogs = await searchUKBlogs(req.body);
    
    try {
       if (!Blogs) {
        return res.render("search-uk.ejs", {
        blogs: null,
        });
        }

        return res.render("search-uk.ejs", {
        blogs: Blogs,
        });

    } catch (err) {
        console.error(err)
    }
    
}

export const searchAUblogsController = async (req, res) => {

    const Blogs = await searchAUBlogs(req.body);
    
    try {
       if (!Blogs) {
        return res.render("search-au.ejs", {
        blogs: null,
        });
        }

        return res.render("search-au.ejs", {
        blogs: Blogs,
        });

    } catch (err) {
        console.error(err)
    }
    
}

export const searchCAblogsController = async (req, res) => {

    const Blogs = await searchCABlogs(req.body);
    
    try {
       if (!Blogs) {
        return res.render("search-ca.ejs", {
        blogs: null,
        });
        }

        return res.render("search-ca.ejs", {
        blogs: Blogs,
        });

    } catch (err) {
        console.error(err)
    }
    
}
import { postBlog } from "../../../service/admin/blogs/post.blog.js";
import { updateBlog } from "../../../service/admin/blogs/update.blog.js";
import { manageByQuery } from "../../../service/admin/blogs/manage.blog.js";
import { deleteBlog } from "../../../service/admin/blogs/delete.blog.js";

export const postBlogController = async (req, res) => {

    const result = await postBlog(req.body, req.file);

    try {

        if (!result.success) {
            return res.redirect(`/post/blog?error=${result.error}`)
        } else {
            return res.redirect(`/post/blog?message=${result.message}`)
        }

    } catch (err) {

        console.error(err);
        return res.redirect(`/post/blog?error=something went wrong`);

    }
}

export const updateBlogController = async (req, res) => {
    
    const result = await updateBlog(req.body, req.params.id, req.file);

    try {

        if (!result.success) {
            return res.redirect(`/post/blog?error=${result.error}`);
        } else {
            return res.redirect(`/post/blog?message=${result.message}`);
        }

    } catch (err) {

        console.error(err);
        return res.redirect(`/post/blog?error=something went wrong`);

    }
}

export const deleteBlogController = async (req, res) => {

    const result = await deleteBlog(req.params);

    try {
        if (!result.success) {
            return res.render("manage-blog.ejs", {
                message: result.message,
                blogs: null
            });
        }

        return res.render("manage-blog.ejs", {
                message: result.message,
                blogs: result.blogs
            });

    } catch (err) {
        console.error(err);
        return res.redirect(`/manage/blog?error=something went wrong`);
    }
}

export const manageByQueryController = async (req, res) => {

    const result = await manageByQuery(req.body);

    try {

        if (!result.success) {
            return res.redirect(`/manage/blog`);
        } else {
            return res.render("manage-blog.ejs", {
            blogs: result.blogs
            })
        }

    } catch (err) {
        console.error(err);
        return res.redirect(`/manage/blog?error=something went wrong`);
    }
}
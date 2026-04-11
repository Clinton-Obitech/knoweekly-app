import pool from "../lib/db.js";
import supabase from "../lib/supabase.js";
import jwt from "jsonwebtoken";
import { hash, compare } from "bcrypt";

export const createAdmin = async (req, res) => {

    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.redirect("/create/admin?message=all fields are required")
    }

    try {
        
        const { data: admin, error: adminError} = await supabase
        .from("admin")
        .select("username, email")
        .or(`username.eq.${username},email.eq.${email}`)
        .limit(1);

        if (adminError) throw adminError

        if (admin) {

        if (admin.username === username || admin.email === email) {

            let message;
            if (admin.username === username && admin.email === email) {
                message = "username and email already exists";
            } else if (admin.username === username) {
                message = "username already exists";
            } else if (admin.email === email) {
                message = "email already exists";
            }

            return res.redirect(`/create/admin?message=${message}`);
        }

        }

        const hashedpassword = await hash(password, 10);

        const { error: insertError} = await supabase
        .from("admin")
        .insert(
            {
                username: username,
                email: email,
                password: hashedpassword
            }
        );

        if (insertError) throw insertError

        return res.redirect("/login/admin?message=admin created. login to continue");

    } catch (err) {
        console.error(err)
    }
}

export const loginAdmin = async (req, res) => {

    const { username, password } = req.body;

    if (!username || !password) {
        return res.redirect("/login/admin?message=complete both fields")
    }

    try {

        const { data: admin, error: adminError } = await supabase
        .from("admin")
        .select("*")
        .eq("username", username)
        .maybeSingle()

        if (adminError) throw adminError

        if (admin.length === 0) {
            return res.redirect("/login/admin?message=no admin found")
        }

        const matchPassword = await compare(password, admin.password);

        if (!matchPassword) {
            return res.redirect("/login/admin?message=incorrect password")
        }

        const adminToken = jwt.sign(
            {id: admin.id},
            process.env.JWT_SECRET,
            {expiresIn: "1d"}
        );

        res.cookie("adminToken", adminToken, {
            httpOnly: true,
            secure: true,
            sameSite: "none"
        });

        return res.redirect("/admin/dashboard")

    } catch (err) {
        console.error(err)
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
        console.error(err)
    }
}

export const postBlog = async (req, res) => {

    const file = req.file;

    const { country, category, title, content } = req.body;

    if (!country || !category || !title || !content) {
        return res.redirect("/post/blog?message=cannot create post with empty field")
    }

    if (!file) {
        return res.redirect("/post/blog?message=no file uploaded")
    }

    try {

        const fileName = `${Date.now()}-${file.originalname}`;

        const { error: uploadError } = await supabase.storage
        .from("blog_image")
        .upload(fileName, file.buffer, {
            contentType: file.mimetype,
        });

        if (uploadError) throw uploadError

        const { data } = supabase.storage
        .from("blog_image")
        .getPublicUrl(fileName)

        const { error: insertError } = await supabase
        .from("blogs")
        .insert(
            {
                country: country,
                category: category,
                image: data.publicUrl,
                title: title,
                content: content
            }
        );

        if (insertError) throw insertError

        return res.redirect("/post/blog?message=posted successful")

    } catch (err) {
        console.error(err)
    }
}

export const updateBlog = async (req, res) => {
    const { country, category, title, content } = req.body;

    const blogId = req.params.id;
    const file = req.file;

    if (!country || !category || !title || !content) {
        return res.redirect("/post/blog?message=cannot create post with empty field")
    }

    try {

        const { data: imageUrl, error } = await supabase
        .from("blogs")
        .select("image")
        .eq("id", blogId)
        .single();

        if (error) throw error

        let image_Url = imageUrl.image;

        if (file) {
            if(image_Url) {
                const oldfileName = image_Url.split("/").pop();

                await supabase.storage
                .from("blog_image")
                .remove([oldfileName])
            }

            const newfileName = `${Date.now()}-${file.originalname}`;

            const { error: uploadError } = await supabase.storage
            .from("blog_image")
            .upload(newfileName, file.buffer, {
                   contentType: file.mimetype,
            });

            if (uploadError) throw uploadError

            const { data } = supabase.storage
            .from("blog_image")
            .getPublicUrl(newfileName);

            image_Url = data.publicUrl;

            }

            const { error: updateError } = await supabase
            .from("blogs")
            .update(
            {
                country: country,
                category: category,
                title: title,
                image: image_Url,
                content: content
            }
            )
            .eq("id", blogId);

            if (updateError) throw updateError

           return res.redirect("/post/blog?message=update successful")

    } catch (err) {
        console.error(err)
    }
}

export const deleteBlog = async (req, res) => {

    const blogId = req.params.id;

    try {
        const { data: imageUrl, error } = await supabase
        .from("blogs")
        .select("image")
        .eq("id", blogId)
        .single();

        if (error) throw error

        const image = imageUrl.image;

        const fileName = image.split("/").pop();

        const { error: storageError } = await supabase.storage
        .from("blog_image")
        .remove([fileName])

        if (storageError) throw storageError

        const { error: deleteError } = await supabase
        .from("blogs")
        .delete()
        .eq("id", blogId);

        if (deleteError) throw deleteError

        return res.redirect("/manage/blog");

    } catch (err) {
        console.error(err)
    }
}

export const chooseCountry = async (req, res) => {

    const { country, category } = req.body;

    try {

        const { data, error } = await supabase
        .from("blogs")
        .select("*")
        .eq("country", country)
        .eq("category", category);

        if (error) throw error

        if (data.length === 0) {
            return res.render("manage-blog.ejs", {
                message: "no post found"
            })
        }

        return res.render("manage-blog.ejs", {
            blogs: data
        })

    } catch (err) {
        console.error(err)
    }
}
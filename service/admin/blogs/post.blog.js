import supabase from "../../../lib/supabase.js";

export const postBlog = async (body, file) => {

    const { country, category, title, content } = body;

    if (!country || !category || !title || !content) {
        return {
            success: false,
            error: "Cannot create post with empty field"
        }
    }

    if (!file) {
        return {
            success: false,
            error: "No file uploaded"
        }
    }

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

    return {
        success: true,
        message: "Blog posted successful"
    }

}
import supabase from "../../../lib/supabase.js";

export const updateBlog = async (body, blogId, file) => {

    const { country, category, title, content } = body;

    if (!country || !category || !title || !content) {
        return {
            success: false,
            error: "Cannot update blog with empty field"
        }
    }

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

        return {
            success: true,
            message: "Blog update successful"
        }

}
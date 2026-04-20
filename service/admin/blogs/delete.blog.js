import supabase from "../../../lib/supabase.js";

export const deleteBlog = async (params) => {

    const { id, country, category , date } = params;

    const { data: imageUrl, error } = await supabase
        .from("blogs")
        .select("image")
        .eq("id", id)
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
        .eq("id", id);

        if (deleteError) throw deleteError

    const { data, error: blogsError } = await supabase
        .from("blogs")
        .select("*")
        .eq("country", country)
        .eq("category", category)
        .eq("date", date);

        if (blogsError) throw blogsError

        if (data.length === 0) {
            return {
                success: false,
                message: "all blogs deleted"
            }
        }

        return {
            success: true,
            message: "blog deleted",
            blogs: data
        }
}
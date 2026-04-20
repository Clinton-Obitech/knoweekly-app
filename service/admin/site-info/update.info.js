import supabase from "../../../lib/supabase.js";

export const updateInfo = async (body, blogId) => {

    const { category, title, subtitle, information } = body;

    if (!category) {
        return {
            success: false,
            error: "cannot update with no category"
        }
    }

    const { error: updateInfoError } = await supabase
        .from("site_info")
        .update({
            category: category,
            title: title,
            subtitle: subtitle,
            information: information
        })
        .eq("id", blogId);

        if (updateInfoError) throw updateInfoError
        
        return {
            success: true,
            message: "info updated success"
        }

}
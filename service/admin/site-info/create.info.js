import supabase from "../../../lib/supabase.js";

export const createInfo = async (body) => {

    const { category, title, subtitle, information } = body;

    if (!category) {
        return {
            success: false,
            error: "cannot create info without category"
        }
    }

    const { error } = await supabase
        .from("site_info")
        .insert({
            category: category,
            title: title,
            subtitle: subtitle,
            information: information
        });

        if (error) throw error

        return {
            success: true,
            message: "info created success"
        }

}
import supabase from "../../../lib/supabase.js";

export const manageByQuery = async (body) => {

    const { country, category, date } = body;

    const { data, error } = await supabase
        .from("blogs")
        .select("*")
        .eq("country", country)
        .eq("category", category)
        .eq("date", date);

        if (error) throw error

        if (data.length === 0) {
            return {
                success: false,
            }
        }

        return {
            success: true,
            blogs: data
        }
}
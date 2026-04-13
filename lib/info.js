import supabase from "../lib/supabase.js";

export const getInfo = async (category) => {
    try {
        const { data, error} = await supabase
        .from("site_info")
        .select("*")
        .eq("category", category)

        if (error) throw error 

        return data;
        
    } catch (err) {
        console.error(err)
    }
}
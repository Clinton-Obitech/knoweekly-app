import supabase from "./supabase.js";

export const getAdmin = async (adminId) => {
    try {

        const { data, error } = await supabase
        .from("admin")
        .select("*")
        .eq("id", adminId)
        .single();

        if (error) throw error

        return data;

    } catch (err) {
        console.error(err)
    }
}
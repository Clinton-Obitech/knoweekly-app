import supabase from "../lib/supabase.js";

export const messages = async () => {

    /*const today = new Date().toISOString().split("T")[0];
    const date = today;*/

    const { data , error } = await supabase
    .from("contact_messages")
    .select("*")
    //.eq("created_at", date)
    .order("id", {ascending: false})

    if (error) throw error

    return data
}
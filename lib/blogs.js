import pool from "./db.js";
import supabase from "./supabase.js";

export const queryUSABlogs = async (category, date) => {

    try {

        const { data, error } = await supabase
        .from("blogs")
        .select("*")
        .eq("country", 'usa')
        .eq("category", category)
        .eq("date", date);

        if (error) throw error

        return data;
        
    } catch (err) {
        console.error(err)
    }
}

export const queryUKBlogs = async (category, date) => {

    try {
        const { data, error } = await supabase
        .from("blogs")
        .select("*")
        .eq("country", 'uk')
        .eq("category", category)
        .eq("date", date);

        if (error) throw error

        return data;
        
    } catch (err) {
        console.error(err)
    }
}
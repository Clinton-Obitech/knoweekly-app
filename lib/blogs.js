import pool from "./db.js";
import supabase from "./supabase.js";

export const getUSABlogs = async () => {

    try {

        const { data, error } = await supabase
        .from("blogs")
        .select("*")
        .eq("country", 'usa');

        if (error) throw error

        return data;
        
    } catch (err) {
        console.error(err)
    }
}

export const queryUSABlogs = async (category) => {

    try {

        const { data, error } = await supabase
        .from("blogs")
        .select("*")
        .eq("country", 'usa')
        .eq("category", category);

        if (error) throw error

        return data;
        
    } catch (err) {
        console.error(err)
    }
}



export const getUKBlogs = async () => {
    try {
        const { data, error } = await supabase
        .from("blogs")
        .select("*")
        .eq("country", 'uk');

        if (error) throw error

        return data;

    } catch (err) {
        console.error(err)
    }
}

export const queryUKBlogs = async (category) => {

    try {
        const { data, error } = await supabase
        .from("blogs")
        .select("*")
        .eq("country", 'uk')
        .eq("category", category);

        if (error) throw error

        return data;
        
    } catch (err) {
        console.error(err)
    }
}
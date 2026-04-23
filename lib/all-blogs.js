import supabase from "./supabase.js";

export const searchUSABlogs = async (body) => {

    const { search } = body;

    if (!search) return;

    const searchTerm = search.trim().split(/\s+/).join(" | ");

    const { data, error } = await supabase
    .from("blogs")
    .select("*")
    .textSearch("title_search", searchTerm)
    .eq("country", 'usa')

    if (error) throw error

    return data
}

export const searchUKBlogs = async (body) => {

    const { search } = body;

    if (!search) return;

    const searchTerm = search.trim().split(/\s+/).join(" | ");

    const { data, error } = await supabase
    .from("blogs")
    .select("*")
    .textSearch("title_search", searchTerm)
    .eq("country", 'uk')

    if (error) throw error

    return data
}

export const searchAUBlogs = async (body) => {

    const { search } = body;

    if (!search) return;

    const searchTerm = search.trim().split(/\s+/).join(" | ");

    const { data, error } = await supabase
    .from("blogs")
    .select("*")
    .textSearch("title_search", searchTerm)
    .eq("country", 'au')

    if (error) throw error

    return data
}

export const searchCABlogs = async (body) => {

    const { search } = body;

    if (!search) return;

    const searchTerm = search.trim().split(/\s+/).join(" | ");

    const { data, error } = await supabase
    .from("blogs")
    .select("*")
    .textSearch("title_search", searchTerm)
    .eq("country", 'ca')

    if (error) throw error

    return data
}

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

export const queryCABlogs = async (category, date) => {

    try {
        const { data, error } = await supabase
        .from("blogs")
        .select("*")
        .eq("country", 'ca')
        .eq("category", category)
        .eq("date", date);

        if (error) throw error

        return data;
        
    } catch (err) {
        console.error(err)
    }
}

export const queryAUBlogs = async (category, date) => {

    try {
        const { data, error } = await supabase
        .from("blogs")
        .select("*")
        .eq("country", 'au')
        .eq("category", category)
        .eq("date", date);

        if (error) throw error

        return data;
        
    } catch (err) {
        console.error(err)
    }
}
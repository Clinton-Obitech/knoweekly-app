import supabase from "../../lib/supabase.js";

export const sendMessage = async (body) => {
    const { fullname, email, message } = body;
    
    const { error} = await supabase
    .from("contact_message")
    .insert({
        name: fullname,
        email: email,
        message: message
    });

    if (error) throw error

    return {
        success: true,
        message: "message sent"
    }
}
import supabase from "../../lib/supabase.js";

export const sendContactMessage = async (body) => {
   console.log(body)

   const { fullname, email, message } = body;

   if (!fullname || !email || !message) {
    return {
        success: false,
        error: "all fields are required"
    }
   }

   const { error } = await supabase
   .from("contact_messages")
   .insert({
    fullname: fullname,
    email: email,
    message: message
   })

   if (error) throw error

   return {
    success: true,
    message: "message sent successfully"
   };
}
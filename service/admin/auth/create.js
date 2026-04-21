import supabase from "../../../lib/supabase.js";
import bcrypt from "bcrypt";

export const createAdmin = async (body) => {

    const { username, email, password } = body;

    if (!username || !email || !password) {
        return { success: false, error: "all fields are required" }
    }

    const { data: admin, error: adminError} = await supabase
          .from("admin")
          .select("username, email")
          .or(`username.eq.${username},email.eq.${email}`)
          .maybeSingle();

          if (adminError) throw adminError

    if (admin) {

        if (admin.username === username || admin.email === email) {

            let message;
            if (admin.username === username && admin.email === email) {
                message = "Username and email already exists";
            } else if (admin.username === username) {
                message = "username already exists";
            } else if (admin.email === email) {
                message = "Email already exists";
            }

            return {
                success: false,
                error: message
            }
        }

    }

    const hashedpassword = await bcrypt.hash(password, 10);

    const { error: insertError} = await supabase
        .from("admin")
        .insert(
            {
                username: username,
                email: email,
                password: hashedpassword
            }
        );

        if (insertError) throw insertError

        return {
            success: true,
            message: "Admin created success"
        }
}
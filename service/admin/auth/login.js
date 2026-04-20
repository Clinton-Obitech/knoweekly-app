import supabase from "../../../lib/supabase.js";
import bcrypt from "bcrypt";

export const loginAdmin = async (body) => {

    const { username, password } = body;

    if (!username || !password) {
            return {
                success: false,
                error: "Both fields are required"
            }
        }

    const { data: admin, error: adminError } = await supabase
        .from("admin")
        .select("*")
        .eq("username", username)
        .maybeSingle();
        
        if (adminError) throw adminError
        
    if (!admin) {
            return {
                success: false,
                error: "No admin found"
            }
        }
        
    const matchPassword = await bcrypt.compare(password, admin.password);
        
    if (!matchPassword) {
            return {
                success: false,
                error: "Incorrect password"
            }
        }

    return {
        success: true,
        admin
    }
}
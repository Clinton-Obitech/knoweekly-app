import { createInfo } from "../../../service/admin/site-info/create.info.js";
import { updateInfo } from "../../../service/admin/site-info/update.info.js";
import supabase from "../../../lib/supabase.js";

export const createInfoController = async (req, res) => {

    const result = await createInfo(req.body);

    try {

        if (!result.success) {
            return res.render("create-site-info.ejs", {
                error: result.error,
                editInfo: null
            })
        } else {
            return res.redirect(`/create/site/info?message=${result.message}`);
        }

    } catch (err) {
        console.error(err);
        return res.redirect(`/create/site/info?error=something went wrong`);
    }
}

export const deleteInfoController = async (req, res) => {
    const infoId = req.params.id;
    const category = req.params.category;

    try {
        const { error } = await supabase
        .from("site_info")
        .delete()
        .eq("id", infoId)
    
        if (error) throw error

        return res.redirect(`/site/info/${category}?message=info deleted success`);
    } catch (err) {
        console.error(err);
        return res.redirect(`/site/info/view?error=something went wrong`);
    }

}

export const updateInfoController = async (req, res) => {

    const result = await updateInfo(req.body, req.params.id);

    try {
        if (!result.success) {
            return res.render("create-site-info.ejs", {
                error: result.error
            })
        }
        return res.redirect(`/create/site/info?message=${result.message}`);

    } catch (err) {
        console.error(err);
        return res.redirect(`/create/site/info?error=something went wrong`);
    }
}
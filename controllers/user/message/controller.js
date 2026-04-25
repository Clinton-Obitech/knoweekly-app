import { sendContactMessage } from "../../../service/user/contact.message.js";

export const SendContactMessageController = async (req, res) => {

    try {
        const result = await sendContactMessage(req.body)

        if (!result.success) {
            return res.redirect(`/contact/us?error=${result.error}`);  
        }

        return res.redirect(`/contact/us?message=${result.message}`);
    } catch (err) {
        console.error(err)
    }
}
import { sendMessage } from "../../../service/user/message.js";

export const MessageController = async (req, res) => {

    const result = await sendMessage(req.body);

    try {
        if (!result.success) {
            return res.redirect(`/contact/us?error=${result.error}`)
        }
            return res.redirect(`/contact/us?message=${result.message}`)
    } catch (err) {
        console.log(err)
        return res.redirect(`/contact/us?error=${result.error}`)
    }
}
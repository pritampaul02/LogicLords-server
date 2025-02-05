// user controller
import { User } from '../models/userModel.js';
import { sendCookie } from '../utils/sendCookie.js';
import { sendResponse } from '../utils/sendResponse.js';


export const googleSignup = async (req, res) => {
    try {
        const { email, name, avatar } = req.body
        let user = await User.findOne({ email: email });

        if (user) {
            // console.log("User exists");
            sendCookie(user, res, 200);
        } else {
            let user = await User.create({
                name,
                email,
                googleAvatar: avatar,
                isEmailVerified: true,
                isGoogleLogin: true,
                llCoins: 10
            });
            // console.log("userCreated", user);

            sendCookie(user, res, 200);
        }
    } catch (error) {
        sendResponse({ res, code: 400, success: false, error: error.message });
    }
}

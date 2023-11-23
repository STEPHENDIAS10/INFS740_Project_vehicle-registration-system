/**
 * Auth middleware
 * 
 * Checks user id in headers and find that user. Add the user to the request.
 * Other endpoints can access user through req.user
*/

const userModel = require("../models/user.model");

async function authMiddleware (req, res, next) {
    try {
    const userId = (req.headers.authorization || "").split(" ")[1];
    delete req.user;
    if (userId) {
        const user = await userModel.findOne({ _id: userId });
        req.user = user;
    }
    next();
    }
    catch (err) {
        next();
    }
}

module.exports = authMiddleware;
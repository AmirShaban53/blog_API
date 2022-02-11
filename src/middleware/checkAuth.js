import JWT from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config();

const checkAuth = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const payload = JWT.verify(token, process.env.JWT_KEY);
        req.userData = payload;
        next();
        
    } catch (error) {
        return res.status(500).json(error);
    }
}

export default checkAuth;
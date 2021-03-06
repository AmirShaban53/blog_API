import User from "../models/user";
import bcrypt from 'bcrypt';
import JWT from "jsonwebtoken";
import logger from "../middleware/logger";
import dotenv from 'dotenv';
dotenv.config();


const registerUser =async (req, res) => {
    try {
        const {username, email, password} = req.body;
        const oldUsers = await User.findAll({where: {email: email}})

        if(oldUsers.length >= 1){
            logger.error('this email already eixsts');
            return res.status(409).json('This email already exists, login instead');
        }
        else{
            bcrypt.hash(password, 10, async(error, hash)=>{
                try {
                    if(error){
                        logger.error('failed to hash password');
                        return res.status(500).json(error);
                    }
                    else{
                        const newUser = {
                            username: username,
                            email: email,
                            password: hash,
                            role: 'USER'
                        } 
                        await User.create(newUser);
                        logger.info('new user created');
                        return res.status(201).json('new user created!');
                    }
                } catch (error) {
                    logger.error('failed to create user');
                    return res.status(500).json(error);
                }
            })
        }
    } 
    catch (error) {
        logger.error('failed to create user');
        return res.status(500).json({source: "failed to create new user",error: error.message})
    }
}

const LoginUser =async (req, res) => {
    try {
        const {email, password} = req.body;

        const user = await User.findOne({where: {email: email}});

        if(user === undefined || user === null){
            logger.error(`the email: ${email} doesn't exist`)
            return res.status(401).json(`auth failed`)
        }
        else{
            bcrypt.compare(password, user.password, (error, result)=>{
                if(error){
                    logger.error(`auth failed error_1: ${error.message}`)
                    return res.status(401).json('auth failed')
                }
                if(result){
                    const token = JWT.sign(
                        {
                            id: user.id,
                            username: user.username,
                            email: user.email,
                            role: user.role
                        },
                        process.env.JWT_KEY,
                        {expiresIn: '2h'}
                    )
                    logger.info(`user successfully signed in`);
                    return res.status(200).json({message: 'user signed in', token: token})
                }
                logger.error(`auth failed completely`)
                return res.status(401).json('auth failed');
            })
        }
    } catch (error) {
        logger.error(`auth failed error_2: ${error.message}`)
        return res.status(500).json({source: "failed to login user"})
    }
}

export {registerUser, LoginUser}
import User from "../models/User";
import bcrypt from 'bcrypt';
import JWT from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config();


const registerUser =async (req, res) => {
    try {
        const {username, email, password} = req.body;
        const oldUsers = await User.findAll({where: {email: email}})

        if(oldUsers.length >= 1){
            return res.status(409).json('This email already exists, login instead');
        }
        else{
            bcrypt.hash(password, 10, async(error, hash)=>{
                try {
                    if(error){return res.status(500).json(error);}
                    else{
                        const newUser = {
                            username: username,
                            email: email,
                            password: hash,
                            role: 'USER'
                        }
                        await User.create(newUser);
                        return res.status(201).json('new user created!');
                    }
                } catch (error) {
                    return res.status(500).json(error);
                }
            })
        }
    } 
    catch (error) {
        res.status(500).json({source: "failed to create new user",error: error.message})
    }
}

const LoginUser =async (req, res) => {
    try {
        const {email, password} = req.body;

        const user = await User.findOne({where: {email: email}});

        if(user === undefined || user === null){
            return res.status(401).json(`the email: ${email} doesn't exist`)
        }
        else{
            bcrypt.compare(password, user.password, (error, result)=>{
                if(error){
                    return res.status(401).json(error)
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
                    return res.status(200).json({message: 'user signed in', token: token})
                }
                return res.status(401).json('auth failed');
            })
        }
    } catch (error) {
        res.status(500).json({source: "failed to login user",error: error.message})
    }
}

export {registerUser, LoginUser}
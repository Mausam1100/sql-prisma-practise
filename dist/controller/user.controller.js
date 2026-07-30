import { prisma } from '../lib/prisma.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import z from 'zod';
const signUpSchema = z.object({
    username: z.string().min(3).max(11),
    password: z.string().min(5).max(20)
});
const comparePassword = (password, hashedPassword) => {
    return bcrypt.compare(password, hashedPassword);
};
const generateToken = (userId) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET);
    return token;
};
export const signUp = async (req, res) => {
    try {
        const result = signUpSchema.safeParse(req.body);
        if (!result.success) {
            return res.status(411).json({
                msg: result.error.issues[0]?.message
            });
        }
        const { username, password } = result.data;
        const existedUser = await prisma.user.findUnique({
            where: {
                username
            }
        });
        if (existedUser) {
            return res.status(403).json({
                msg: "User with this username already existed!"
            });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        await prisma.user.create({
            data: {
                username,
                password: hashedPassword
            }
        });
        res.status(200).json({
            msg: "User sign up successfully!"
        });
    }
    catch (error) {
        console.log(`Error in signUp controller: ${error}`);
    }
};
export const signIn = async (req, res) => {
    try {
        const result = signUpSchema.safeParse(req.body);
        if (!result.success) {
            return res.status(411).json({
                msg: result.error.issues[0]?.message
            });
        }
        const { username, password } = result.data;
        const existedUser = await prisma.user.findUnique({
            where: {
                username
            }
        });
        if (!existedUser) {
            return res.status(400).json({
                msg: "User with this username doesn't exist!"
            });
        }
        const isPasswordCorrect = await comparePassword(password, existedUser.password);
        if (!isPasswordCorrect) {
            return res.status(411).json({
                msg: "Incorrect password!"
            });
        }
        const jwt = generateToken(existedUser.id);
        res.status(200).json({
            msg: "User logged in successfully!",
            jwt
        });
    }
    catch (error) {
        console.log(`Error in signIn controller: ${error}`);
    }
};
export const logOut = (res, req) => {
    try {
        return res.status(200).json({
            msg: "Logout successfully!"
        });
    }
    catch (error) {
        console.log(`Error in logOut controller ${error}`);
    }
};
//# sourceMappingURL=user.controller.js.map
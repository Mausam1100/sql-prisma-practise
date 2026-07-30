import jwt from 'jsonwebtoken';
export const authMiddleware = async (req, res, next) => {
    try {
        const token = req.headers['authorization'];
        if (!token) {
            return res.status(411).json({
                msg: "JWT is not included!"
            });
        }
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        if (!decodedToken) {
            return res.status(411).json({
                msg: "JWT is not correct"
            });
        }
        req.userId = decodedToken.userId;
        next();
    }
    catch (error) {
        console.log(`Error in authMiddleware ${error}`);
    }
};
//# sourceMappingURL=auth.middleware.js.map
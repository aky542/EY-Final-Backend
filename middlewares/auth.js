import jwt from 'jsonwebtoken';

const authMiddleware = async (req, res, next) => {

    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ success: false, message: 'Authorization header is missing' });
    }

  
    const token = authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ success: false, message: 'Token is missing' });
    }

    try {
        const secret_key ="123123123asdfhasdfhaklh3892";
        const decoded = jwt.verify(token,secret_key);

     
        req.user = decoded;

        next();
    } catch (error) {
        return res.status(401).json({ success: false, message: 'Invalid token' });
    }
};

export default authMiddleware;

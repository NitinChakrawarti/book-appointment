const jwt = require('jsonwebtoken');

module.exports = async (request, response, next) => {
    try {
        const token = request.cookies.logintoken;
        if (!token) {
            return response.status(401).json({ message: 'Authentication token is required' });
        }
        try {
            const info = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
            request.body.userId = info.id;
            next();
        } catch (verifyError) {
            return response.status(403).json({ message: 'Invalid or expired token' });
        }
    } catch (error) {
        return response.status(500).json({ message: 'Internal server error', error });
    }
};
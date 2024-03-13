const jwt = require('jsonwebtoken');
const User = require('../models/user');

const auth = async (req, res, next) => {
    try {
        // Get the token from the request header
        const token = req.header('Authorization').replace('Bearer ', '');
        // Decode the token and get the user id
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // Find the user by id and token
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token });

        if (!user) {
            throw new Error();
        }

        // Add the user and token to the request object
        req.user = user;
        req.token = token;
        next();
    } catch (e) {
        res.status(401).send({ error: 'Please authenticate.' });
    }
}
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const authorize = require('../middleware/authorize');
const express = require('express'); 
const router = express.Router();
const { check, validationResult } = require('express-validator');


// Create a new user
router.post('/users', [
    check('username').isLength({ min: 3 }),
    check('password').isLength({ min: 5 })
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).send(errors.array()
    )}
});

router.post('/users', async (req, res) => {

});

// Login a user and generate a token
router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        if (!user) {
            return res.status(404).send('User not found');
        }
        const isMatch = await bcrypt.compare(req.body.password, user.password);
        if (!isMatch) {
            return res.status(401).send('Invalid password');
        }
        const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET);
        user.tokens = user.tokens.concat({ token });
        await user.save();
    } catch (e) {res.status(500).send(e)}
}
);

// Logout a user
router.post('/users/logout'
);


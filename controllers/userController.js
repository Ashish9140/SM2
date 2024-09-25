// controllers/userController.js
const UserService = require('../services/userService');

// Controller to handle POST request for adding a new user
exports.addUser = async (req, res) => {
    try {
        const { name, age } = req.body;
        // const user = await UserService.createUser(name, email, age);
        console.log(name,age);

        res.status(201).json({
            message: 'User added successfully',
            // user
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

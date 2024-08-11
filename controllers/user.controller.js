const USER_MODEL = require('../models/user.model');
const BCRYPT = require('bcrypt');

// Mendapatkan daftar semua pengguna
async function getUser(req, res) {
    try {
        const users = await USER_MODEL.getUser();
        res.status(200).json({
            status: 'success',
            message: 'Users retrieved successfully',
            data: users
        });
        console.log(users);
        
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Failed to retrieve users'
        });
    }
}

// Mendapatkan pengguna berdasarkan ID
async function getUserById(req, res) {
    try {
        const user = await USER_MODEL.getUserById(req.params.id);
        if (user) {
            res.status(200).json({
                status: 'success',
                message: 'User retrieved successfully',
                data: user
            });
        } else {
            res.status(404).json({
                status: 'error',
                message: 'User not found'
            });
        }
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Failed to retrieve user'
        });
    }
}
async function createUser(req, res) {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({
                status: 'error',
                message: 'Invalid input'
            });
        }

        const hashedPassword = BCRYPT.hashSync(password, 10);

        const user = await USER_MODEL.createUser(name, email, hashedPassword);
        res.status(201).json({
            status: 'success',
            message: 'User created successfully',
            data: user
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Failed to create user'
        });
    }
}

module.exports = { 
    createUser,
    getUser,
    getUserById 
};

const USER_MODEL = require('../models/user.model');
const bcrypt = require('bcrypt');

// Mendapatkan daftar semua pengguna
async function getUser(req, res) {
    try {
        const users = await USER_MODEL.getUser();
        res.status(200).json({
            status: 'success',
            message: 'Users retrieved successfully',
            data: users
        });
    } catch (error) {
        console.error('Error retrieving users:', error);
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
        console.error('Error retrieving user by ID:', error);
        res.status(500).json({
            status: 'error',
            message: 'Failed to retrieve user'
        });
    }
}

// Membuat pengguna baru
async function createUser(req, res) {
    try {
        const { name, email, password } = req.body;

        // Validasi input
        if (!name || !email || !password) {
            return res.status(400).json({
                status: 'error',
                message: 'Invalid input'
            });
        }

        // Validasi email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                status: 'error',
                message: 'Invalid email format'
            });
        }

        // Hash password secara asinkron
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await USER_MODEL.createUser(name, email, hashedPassword);
        res.status(201).json({
            status: 'success',
            message: 'User created successfully',
            data: user
        });
    } catch (error) {
        console.error('Error creating user:', error);
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

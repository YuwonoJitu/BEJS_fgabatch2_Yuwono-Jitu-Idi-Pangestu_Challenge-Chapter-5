const bcrypt = require('bcrypt');
const prisma = require("../config/prisma");
const jwt = require('jsonwebtoken');

async function login(req, res, next) {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({
        where: { email: email }
    });

    if (!user) {
        return res.status(401).json({
            status: 'error',
            message: 'User is not registered'
        });
    }
    const isPasswordMatch = bcrypt.compareSync(password, user.password);

    if (!isPasswordMatch) {
        return res.status(401).json({
            status: 'error',
            message: 'Incorrect email/password'
        });
    }

    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token: token });
}

async function register(req, res, next) {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({
            message: 'All fields are required'
        });
    }

    try {

        const hashedPassword = bcrypt.hashSync(password, 10);

        const data = await createUser({ name, email, password: hashedPassword });

        return res.status(201).json({
            message: "User created",
            data: data,
        });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({
            message: "Can't create user",
            error: error.message 
        });
    }
}


module.exports = { login, register };

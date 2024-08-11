const bcrypt = require('bcrypt');
const prisma = require("../config/prisma");

async function auth(req, res, next) {
    // Mengambil email dan password dari request body
    const { email, password } = req.body;
    // mencari user berdasarkan email yang diinputkan
    const user = await prisma.user.findUnique({
        where: { email: email }
    });

    if (!user) {
        return res.status(401).json({
            status: 'error',
            message: 'User tidak terdaftar'
        });
    }
    const isPasswordMatch = bcrypt.compareSync(password, user.password)

    if (!isPasswordMatch) {
        return res.status(401).json({
            status: 'error',
            message: 'Email/Password salah'
        });
    }
    res.json(user);
}

module.exports = { auth };
const prisma = require('../config/db');

async function getAccount () {
    return await prisma.account.findMany();
};

async function getAccountById (id) {
    return await prisma.account.findUnique({
         where: { id }
    });
};

async function createAccount (id, userId, bank_name, bank_account_number, balance) {
    return await prisma.account.create({
        data: {
            id,
            user_id: userId,
            bank_name,
            bank_account_number,
            balance
        }
    });
};

module.exports = {
    getAccount,
    getAccountById,
    createAccount,
 };

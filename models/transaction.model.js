const prisma = require('../config/db');

async function getTransactions () {
    try {
        return await prisma.transaction.findMany({
            include: {
                sourceAccount: true,
                destinationAccount: true
            }
        });
    } catch (error) {
        console.error ('error retrieving transactions:', error);
        throw new Error ('failed to retrieve transactions');
        }
};


async function getTransactionById (id) {
    try {
        return await prisma.transaction.findUnique({
            where: {id: Number(id) },
            include: {
                sourceAccount: true,
                destinationAccount: true
            }
        });
    } catch (error) {
        console.error ('error retrieving transaction by id:', error);
        throw new Error ('failed to retrieve transaction by id');
    }
};

async function createTransaction (transactionData) {
    try {
        return await prisma.transaction.create({
            data: transactionData,
            include: {
                sourceAccount: true,
                destinationAccount: true
            }
        });
    } catch (error) {
        console.error ('error creating transaction:', error);
        throw new Error ('failed to create transaction');
    }
};

module.exports = {
    getTransactions,
    getTransactionById,
    createTransaction
};
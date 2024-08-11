const TRANSACTION_MODEL = require('../models/user.model');

async function getTransactions (req, res) {
    try {
        const transactions = await TRANSACTION_MODEL.getTransactions(req.user.id);
        res.status(200).json({
            status:'success',
            message: 'Transactions retrieved successfully',
            data: transactions
        });
    } catch (error) {
        console.error('Error retrieving transactions:', error);
        res.status(500).json({
            status: 'error',
            message: 'Failed to retrieve transactions. Please try again later.',
        });
    }
};

async function getTransactionById (req, res) {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({
                status: 'error',
                message: 'Invalid input. Please provide a valid transaction ID.',
            });
        }

        const transaction = await TRANSACTION_MODEL.getTransactionById(id);

        if (!transaction) {
            return res.status(404).json({
                status: 'error',
                message: 'Transaction not found',
            });
        }

        res.status(200).json({
            status: 'success',
            message: 'Transaction retrieved successfully',
            data: transaction,
        });
    } catch (error) {
        console.error('Error retrieving transaction:', error);
        res.status(500).json({
            status: 'error',
            message: 'Failed to retrieve transaction. Please try again later.',
        });
    }
}


async function createTransaction(req, res) {
    try {
        const { sourceAccountId, destinationAccountId, amount } = req.body;

        if (!sourceAccountId || !destinationAccountId || !amount) {
            return res.status(400).json({
                status: 'error',
                message: 'Invalid input',
            });
        }

        const transactionData = { sourceAccountId, destinationAccountId, amount };
        const newTransaction = await TRANSACTION_MODELS.createTransaction(transactionData);

        res.status(201).json({
            status: 'success',
            message: 'Transaction created successfully',
            data: newTransaction,
        });
    } catch (error) {
        console.error('Error creating transaction:', error);
        res.status(500).json({
            status: 'error',
            message: 'Failed to create transaction. Please try again later.',
        });
    }
}

module.exports = {
    getTransactions,
    getTransactionById,
    createTransaction,
};
const ACCOUNT_MODEL = require('../models/account.model');

async function getAccounts(req, res) {
    try {
        const accounts = await ACCOUNT_MODEL.getAccounts();

        if (accounts.length === 0) {
            // Jika tidak ada akun yang ditemukan
            res.status(404).json({
                status: 'error',
                message: 'No accounts found',
            });
        } else {
            // Jika berhasil mendapatkan akun
            res.status(200).json({
                status: 'success',
                message: 'Accounts retrieved successfully',
                data: accounts,
            });
        }
    } catch (error) {
        // Tangani kesalahan dengan lebih spesifik
        console.error('Error retrieving accounts:', error);
        res.status(500).json({
            status: 'error',
            message: 'Failed to retrieve accounts. Please try again later.',
        });
    }
}

async function getAccountById(req, res) {
	try {
        const accountId = parseInt(req.params.id);
        const account = await ACCOUNT_MODEL.getAccountById(accountId);

        if (account) {
            res.status(200).json({
                status: 'success',
                message: 'Account retrieved successfully',
                data: account,
            });
        } else {
            res.status(404).json({
                status: 'error',
                message: 'Account not found',
            });
        }
    } catch (error) {
        console.error('Error retrieving account:', error);
        res.status(500).json({
            status: 'error',
            message: 'Failed to retrieve account. Please try again later.',
        });
    }
}

async function createAccount (req, res) {
	try {
        const { id, userId, bank_name, bank_account_number, balance } = req.body;
		if (!id ||!userId ||!bank_name ||!bank_account_number ||!balance) {
            res.status(400).json({
				status: 'error',
                message: 'Invalid input' 
			});
				
        } else {
        const account = await ACCOUNT_MODEL.createAccount(id, userId, bank_name, bank_account_number, balance);

        res.status(201).json({
            status: 'success',
            message: 'Account created successfully',
            data: account,
        });
	}
    } catch (error) {
        console.error('Error creating account:', error);
        res.status(500).json({
            status: 'error',
            message: 'Failed to create account. Please try again later.',
        });
    }
}


module.exports = { 
	getAccounts,
	getAccountById,
	createAccount 
};

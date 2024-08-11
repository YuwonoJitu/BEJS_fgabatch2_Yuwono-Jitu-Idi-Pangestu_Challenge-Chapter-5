const express = require('express');
const router = express.Router();
//const authMiddleware = require('../../../../middlewares/auth.middleware');
const TRANSACTION_CONTROLLER = require('../../../../controllers/transaction.controller');

router.get('/', TRANSACTION_CONTROLLER.getTransactions);                    
router.get('/:transactionId', TRANSACTION_CONTROLLER.getTransactionById);  
router.post('/', TRANSACTION_CONTROLLER.createTransaction);                 

module.exports = router;

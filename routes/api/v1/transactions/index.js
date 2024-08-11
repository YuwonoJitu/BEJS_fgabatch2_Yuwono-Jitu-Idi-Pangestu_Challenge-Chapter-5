const express = require('express');
const router = express.Router();
const authMiddleware = require('../../../../middlewares/restrict');
const TRANSACTION_CONTROLLER = require('../../../../controllers/transaction.controller');

router.get('/', TRANSACTION_CONTROLLER.getTransactions);                    
router.get('/:transactionId', TRANSACTION_CONTROLLER.getTransactionById);  
router.post('/', authMiddleware, TRANSACTION_CONTROLLER.createTransaction);                 

module.exports = router;

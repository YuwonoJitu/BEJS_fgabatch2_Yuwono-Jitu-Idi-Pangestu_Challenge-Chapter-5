const express = require('express');
const router = express.Router();
const authMiddleware = require("../../../../middlewares/restrict");
const ACCOUNT_CONTROLLER = require('../../../../controllers/account.controller');

router.get('/', ACCOUNT_CONTROLLER.getAccounts);
router.get('/:accountId', ACCOUNT_CONTROLLER.getAccountById);
router.post('/', authMiddleware, ACCOUNT_CONTROLLER.createAccount);

module.exports = router;

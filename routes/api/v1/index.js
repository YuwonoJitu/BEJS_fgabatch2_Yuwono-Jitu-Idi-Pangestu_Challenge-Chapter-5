const express = require('express');
const router = express.Router();

const accountsRoutes = require('./accounts');
//const profilesRoutes = require('./profiles');
const transactionsRoutes = require('./transactions');
const usersRoutes = require('./users');
const loginRoutes = require('./Login');
const swaggerUi = require('swagger-ui-express');
const swagerDocumentJson = require('../../../docs/api-docs-v1.json');

router.use('/accounts', accountsRoutes);
//router.use('/profiles', profilesRoutes);
router.use('/transactions', transactionsRoutes);
router.use('/users', usersRoutes);
router.use('/login',loginRoutes);
router.use('/docs', swaggerUi.serve, swaggerUi.setup(swagerDocumentJson));

module.exports = router;

var express = require('express');
var router = express.Router();
const USER_CONTROLLER = require('../../../../controllers/user.controller');
const AUTH_MIDDLEWARE = require('../../../../middlewares/restrict');

router.get('/', AUTH_MIDDLEWARE, USER_CONTROLLER.getUser);
router.get('/:id', AUTH_MIDDLEWARE, USER_CONTROLLER.getUserById);
router.post('/', USER_CONTROLLER.createUser);

module.exports = router;

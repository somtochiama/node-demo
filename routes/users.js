var express = require('express');
var router = express.Router();
const verifyToken = require('../middleware/token')
const controller = require("../controllers/users");

/* GET users listing. */
router.get('/', verifyToken, controller.getAllUsers);

router.put('/:id', verifyToken, controller.updateUser);

module.exports = router;

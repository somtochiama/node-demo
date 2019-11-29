const express = require('express');
const router = express.Router();
const authController = require('../controllers/user')

/* GET home page. */
router.get('/', (req, res, next) => {
  res.status(200).json({
    message: "Welcome to Enyata Academy API"
  })
});

router.post('/register', authController.registerController)

router.post('/login', authController.loginController);




module.exports = router;

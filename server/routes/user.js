const express = require('express')
const router = express.Router()

const userController = require('../controllers/userController')
const {  isLoggedIn, isAdminLoggedIn } = require('../middlewares/authMiddleware')

// HomePage
router.get('/', isLoggedIn, userController.getHome)



module.exports = router
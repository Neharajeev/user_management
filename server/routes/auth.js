const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");
const { registerValidation } = require('../validators/userValidator')

const { isLoggedOut, isAdminLoggedOut } = require('../middlewares/authMiddleware')

// User registration
router
  .route("/register")
  .get( isLoggedOut, authController.getUserRegister)
  .post( registerValidation, authController.userRegister);

// User login
router
  .route("/login")
  .get( isLoggedOut, authController.getUserLogin)
  .post(authController.userLogin);




// Admin login
router
  .route("/admin/login")
  .get(isAdminLoggedOut, authController.getAdminLogin)
  .post(authController.adminLogin);

// User Logout

router
    .route('/logout')
    .get((req,res)=> { res.redirect('/login')})
    .post(authController.logout)

// Admin Logout

router
    .route('/admin/logout')
    .get((req,res)=> { res.redirect('/admin/login')})
    .post(authController.logout)

module.exports = router;

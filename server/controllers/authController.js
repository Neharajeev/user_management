const User = require("../models/userSchema");
const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");

const adminLayout = './layouts/main.ejs'

const crediential ={
  email:"admin@gmail.com",
  password:"123"
}



module.exports = {
  getUserLogin: async (req, res) => {
    console.log(req.locals);
    res.render("user/login", {
      error: req.flash("error"),
      success: req.flash("success"),

    });

    // req.locals.logout = false
  },
  getUserRegister: async (req, res) => {
    res.render("user/register", {
      error: req.flash("error"),
      success: req.flash("success"),
    });
  },

  userRegister: async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty) {
      req.flash(
        "error",
        errors.map((err) => err.msg)
      );
      return res.redirect("/register");
    }

    const { username, email, password, confirmPassword } = req.body;

    const existUser = await User.findOne({ email });

    if (existUser) {
      req.flash("error", "Email already in use");
      return res.redirect("/register");
    }

    if (password !== confirmPassword) {
      req.flash("error", "Password do not match");
      return res.redirect("/register");
    }

    const user = new User({
      username,
      email,
      password,
    });

    let savedUser = await user.save();

    if (savedUser) {
      console.log("User registered successfully, Please login");
      req.flash("success", "User registered successfully, Please login");
      return res.redirect("/login");
    } else {
      req.flash("error", "User registration failed");
      return res.redirect("/register");
    }
  },
  userLogin: async (req, res) => {
    // console.log(req.body);
    const { email, password } = req.body;

    const user = await User.findOne({ email, isAdmin: false });

    if (!user) {
      req.flash("error", "User does not exist or Invalid Credentials");
      return res.redirect("/login");
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      req.flash("error", "Invalid Credentials");
      return res.redirect("/login");
    }

    req.session.user = user;
    req.flash("success", "User successfully logged in");
    res.redirect("/");
  },

  logout: async (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        return;
      }
      res.clearCookie("connect.sid");
      // res.locals.logout = true
    //   res.json({ message: "Successfully logged out" });
      res.redirect('/login')

    });

    // res.locals.logout = true;
    // res.redirect("/login");
  },


  // Admin
  getAdminLogin:async(req,res)=>{
     res.render("admin/login",{
      error: req.flash("error"),
      success:req.flash("success")
     })
  },
  adminLogin: async (req,res)=>{
    const {email,password}=req.body
    if(email!==crediential.email||password!==crediential.password){
      req.flash("error","Admin does not exist or Invalid Credential")
      return res.redirect("/admin/login")
    }

    req.session.admin = {email:crediential.email}
    req.flash("success","Admin successfully logged in")
    res.redirect("/admin")
  },
   

  adminLogout: async (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        return;
      }
      res.clearCookie("connect.sid");
      res.redirect('/admin/login')

    });
  },
};

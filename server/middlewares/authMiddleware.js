module.exports = {
    isLoggedIn: (req,res,next) => {
        if(req.session && req.session.user){
            next()
        } else {
            res.redirect('/login')
        }
    },
    isLoggedOut: (req,res,next) => {
        if(req.session && req.session.user){
            res.redirect('/')
        } else {
            next()
        }
    },
    isAdminLoggedIn: (req,res,next) => {
        if(req.session && req.session.admin){
            next()
        } else {
            res.redirect('/admin/login')
        }
    },
    isAdminLoggedOut: (req,res,next) => {
        if(req.session && req.session.user){
            res.redirect('/admin')
        } else {
            next()
        }
    },
}
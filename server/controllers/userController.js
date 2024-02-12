
module.exports = {
    getHome: async (req,res) => {
        res.render('/home', {
            user: req.session.user,
            error: req.flash('error'),
            success: req.flash('success')
        })
    },
}
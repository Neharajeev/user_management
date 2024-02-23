const express =require('express')
const router=express.Router()
const customerController=require('../controllers/customerController')
const { isAdminLoggedIn }=require('../middlewares/authMiddleware')

router.use(isAdminLoggedIn)
//routes of home
router.get('/',customerController.homepage)
router.route('/add')
    .get(customerController.addCustomer)
    .post(customerController.postCustomer)
router.get('/view/:id',customerController.view)
router.get('/edit/:id',customerController.edit)
router.put('/edit/:id',customerController.editpost)
router.delete('/edit/:id',customerController.deleteCustomer)
router.post('/search',customerController.searchCustomer)





module.exports=router
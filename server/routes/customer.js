const express =require('express')
const router=express.Router()
const customerController=require('../controllers/customerController')

//routes of home
router.get('/',customerController.homepage)
router.get('/add',customerController.addCustomer)
router.post('/add',customerController.postCustomer)
router.get('/view/:id',customerController.view)
router.get('/edit/:id',customerController.edit)
router.put('/edit/:id',customerController.editpost)
router.delete('/edit/:id',customerController.deleteCustomer)
router.post('/search',customerController.searchCustomer)





module.exports=router
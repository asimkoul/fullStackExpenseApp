const express=require('express')
const router=express.Router()

const controller=require('../controllers/admin')

router.post('/expense',controller.postExpense)
router.get('/expense',controller.getExpense)
router.delete('/expense/:id',controller.deleteExpense);
router.get('/expense/:id',controller.getEditExpense);
//router.post('/user/:id',controller.postEditUser);


module.exports=router
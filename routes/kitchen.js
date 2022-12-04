const Order = require("../models/order")
const express = require('express');
const router=express.Router()
const kitchenController = require("../controllers/kitchenController")


router.get('/',kitchenController().orderdeets)
router.patch('/:id',getOrder,kitchenController().updateOrder)
router.delete('/:id',getOrder,kitchenController().deleteOrder)

async function getOrder(req,res,next){
    let orders
    try {
        
        orders= await Order.findById(req.params.id)
        if(orders===null){
            res.json("No Order")
        }

    } catch (error) {
        console.log(error);
        res.json(error)
    }
    res.order = orders
    next()
}

module.exports=router
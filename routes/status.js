const express = require('express');
const router=express.Router()
const Order = require("../models/order")
const kitchenController = require("../controllers/kitchenController")

router.get('/:id',getOrder,kitchenController().orderstatus)

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

module.exports = router
const express = require('express');
const router=express.Router()
const Order=require('../models/order')

router.post('/',async (req,res)=>{
   
    
    const order = new Order({
                name:req.body.name,
                phone:req.body.phone,
                address:req.body.address,
                postalCode:req.body.postalCode,
                pizza:req.body.pizza,
                billAmount:req.body.billAmount,
                status:"unconfirmed"
            })
            try {
                
                const neworder= await order.save()
                res.json(neworder)
        
            } catch (error) {
                res.send(error)
            }
        })

    module.exports=router
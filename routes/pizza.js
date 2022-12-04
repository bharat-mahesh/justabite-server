const express = require('express');
const router=express.Router()
const Pizza=require('../models/pizza')
const menuController=require('../controllers/menuController')
const multer=require('multer')
const { S3Client } = require('@aws-sdk/client-s3');
const multers3 = require('multer-s3');
require('dotenv').config()

const s3=new S3Client({
    region: process.env.REGION,
  credentials: {
    accessKeyId: process.env.ACCESS_KEY,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
  },
  sslEnabled: false,
  s3ForcePathStyle: true,
  signatureVersion: 'v4',

})


const upload=multer({
        storage:multers3({
            s3:s3,
            bucket:"pizzatime-mernlab",
            metadata:function (req, file, cb) {
                cb(null, {fieldName: file.fieldname});
              },
            key:function (req, file, cb) {
                cb(null, Date.now().toString())
              }
        })
    })


router.get('/', menuController().index)
    
router.get('/:id',getPizza,menuController().pizzadeets)

router.post('/',upload.single('image'),async (req,res)=>{
   
    
    const pizza = new Pizza({
                name:req.body.name,
                prices:req.body.prices,
                image:req.file.location
            })
            try {
                
                const newpizza= await pizza.save()
                res.json(newpizza)
        
            } catch (error) {
                res.send(error)
            }
    
    
    
    
})

async function getPizza(req,res,next){
    let pizza
    try {
        
        pizza= await Pizza.findById(req.params.id)
        if(pizza===null){
            res.json("No pizza")
        }

    } catch (error) {
        res.json(error)
    }
    res.pizza = pizza
    next()
}
module.exports=router
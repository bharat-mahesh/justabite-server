require('dotenv').config()
const express = require('express');
const cors = require('cors');
const session = require('express-session');
const app=express()
app.use(cors())
const mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE_URI,{useNewUrlParser: true})
db=mongoose.connection

db.on('error',(error)=>(console.log(error)))
db.once('open',()=>(console.log("Succesful")))

app.use(express.json())
app.use(session({
    secret: 'secret key',
    saveUninitialized: false,
    resave: false,
}));

const pizza=require('./routes/pizza')
const order=require('./routes/checkout')
const kitchen=require('./routes/kitchen')
const status=require('./routes/status')
const userRouter = require('./routes/user')

app.use("/menu",pizza)
app.use("/checkout",order)
app.use("/kitchen",kitchen)
app.use("/status",status)
app.use("/user",userRouter)


app.listen(5000,()=>{
    console.log("Listening on 5000");
})

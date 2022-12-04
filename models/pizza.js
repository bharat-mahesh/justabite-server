const mongoose = require('mongoose');

const pizzaSchema=mongoose.Schema({
name:{
    type:String
},
prices:{
    type:Number
},

image:{
    type:String
}
})

module.exports = mongoose.model('Pizza',pizzaSchema)
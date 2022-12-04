const mongoose = require('mongoose');

const orderSchema=mongoose.Schema({
name:{
    type:String
},
phone:{
    type:String
},
address:{
    type:String
},
postalCode:{
    type:String
},

pizza: [{
    pizzaName: String,
    quantity: Number
}],
billAmount:{
    type:Number
},
status:{
    type:String
}

})

module.exports = mongoose.model('Order',orderSchema)

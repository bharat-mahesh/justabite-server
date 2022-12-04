const Order = require("../models/order")

function kitchenController(){
    return{
        async orderdeets(req,res){
            const order = await Order.find({})
            try {
                res.json(order)
            } catch (error) {
                res.json(error)
            }
        },
        async updateOrder(req,res){
            res.order.status=req.body.status
            
            try {
                const updatedOrder=await res.order.save()
                res.json(updatedOrder)
            } catch (error) {
                console.log(error);
                res.json(error)
            }
        },
        async deleteOrder(req,res){
            try {
                await res.order.remove()
                res.send("Delivered")
            } catch (error) {
                res.json(error)
            }
        },
        async orderstatus(req,res){
            try {
                
                res.json(res.order.status)

            } catch (error) {
                res.json(error)
            }
        }
    }

}

module.exports = kitchenController
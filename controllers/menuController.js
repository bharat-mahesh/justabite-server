const Pizza=require('../models/pizza')

function menuController(){
    return{
        async index(req,res){
            const pizzas = await Pizza.find({})
            try {
                res.json(pizzas)
                
            } catch (error) {
                res.send(error).status(500)
            }
        },
        async pizzadeets(req,res){
            // console.log(res);
            try {
                card={
                    name:res.pizza.name,
                   
                    prices:res.pizza.prices
                }
                res.json(card)
                
            } catch (error) {
                res.json(error)
            }
           
        }
    }
}

module.exports = menuController
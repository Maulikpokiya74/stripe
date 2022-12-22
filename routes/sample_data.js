var express = require('express');

const routes = express.Router();

var database = require('../config/config');

var customerController = require('../controllers/customer')

routes.get("/", (req,res,next)=>{
    res.render('sample_data',{title : 'node js crud application'})
})

routes.post("/action",customerController.actionReply)
routes.post("/action1", customerController.actionReply1)
routes.get("/stripePayment", customerController.stripePayment)
// routes.post("/stripe", customerController.stripe)
routes.post("/payment", customerController.payment)

module.exports = routes;
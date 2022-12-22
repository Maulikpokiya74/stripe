const database = require("../config/db");

require("dotenv").config();
const stripe = require('stripe')(process.env.STRIPE_KEY)
const YOUR_DOMAIN = "https://localhost:3007";

module.exports.actionReply = (req, res) => {
    // console.log(req.body)
    var action = req.body.action;
    if (action == 'fetch') {
        var query = "SELECT * FROM products ORDER BY id";
        var sql = database.query(query, (err, data) => {
            return res.json({
                data: data
            })
        })
    }
}
module.exports.actionReply1 = (req, res) => {
    // console.log(req.body)
    var action = req.body.action;
    if (action == 'fetch') {
        var query = "SELECT * FROM products ORDER BY RAND() LIMIT 1";
        var sql = database.query(query, (err, data) => {
            return res.json({
                data: data
            })
        })
    }
}

module.exports.stripePayment = (req, res) => {
    return res.render("stripe")
}

module.exports.payment1 = async (req, res) => {
    const { product } = req.body;
    const session = await stripe.checkout.sessions.create({
        payment_method_type: ['card'],

        line_items: [
            {
                price_data :{
                    currency: 'inr',
                    product_data: {
                        name : product.name,
                        Phone_number : product.Phone_number
                    },
                    unit_amount: product.amount * 100
                    
                },
                quentity : product.quentity 

                // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
                // price: '{{PRICE_ID}}',
                // quantity: 1,
            },
        ],
        mode: 'payment',
        success_url: `${YOUR_DOMAIN}/success.html`,
        cancel_url: `${YOUR_DOMAIN}/cancel.html`,
    });

    res.json({ id: session.id});
}

module.exports.payment = (req, res) => {

    // Moreover you can take more details from user
    // like Address, Name, etc from form
    stripe.customers.create({
        email: req.body.stripeEmail,
        source: req.body.stripeToken,
        name: 'Gautam Sharma',
        address: {
            line1: 'TC 9/4 Old MES colony',
            postal_code: '110092',
            city: 'New Delhi',
            state: 'Delhi',
            country: 'India',
        }
    })
        .then((customer) => {

            return stripe.charges.create({
                amount: 8000, // Charing Rs 25
                description: 'Web Development Product',
                currency: 'USD',
                customer: customer.id
            });
        })
        .then((charge) => {
            res.send("Success") // If no error occurs
        })
        .catch((err) => {
            res.send(err) // If some error occurs
        });
}

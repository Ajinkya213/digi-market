const catchAsyncErrors = require('../middlewares/catchAsyncErrors')
const sendEmail = require("../utils/sendEmail");
const {confirmOrder} = require("./confirmOrderController");

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// Process stripe payments   =>   /api/v1/payment/process
exports.processPayment = catchAsyncErrors(async (req, res, next) => {

    const paymentIntent = await stripe.paymentIntents.create({
        amount: req.body.amount,
        currency: 'usd',

        metadata: { integration_check: 'accept_a_payment' }
    });
    res.status(200).json({
        success: true,
        client_secret: paymentIntent.client_secret
    })
 next();
})

// Send stripe API Key   =>   /api/v1/stripeapi
exports.sendStripApi = catchAsyncErrors(async (req, res, next) => {

    res.status(200).json({
        stripeApiKey: process.env.STRIPE_API_KEY
    })

})

exports.confirmOrder = catchAsyncErrors(async (req, res, next) => {

    console.log("confirm order")
    console.log(req.body);
    try{
        await sendEmail({
            email:"admin@farmermarket.com",
            subject:"New order has been received.",
            message:`This is a notification for new order. New order has been placed for $ ${req.body.amount}`
        });

    }
    catch (e){console.log(e)}
})
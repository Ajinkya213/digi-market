const sendEmail = require("../utils/sendEmail");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");


exports.confirmOrder = catchAsyncErrors(async (req, res, next) => {
   console.log("confirm order")
    try{
    await sendEmail({
    email:"admin@farmermarket.com",
    subject:"New order has been received.",
    message:"This is a notification for new order."
    });
        res.status(200).json({
            success: true,
            message: `Email sent`
        })

    }
    catch (e){console.log(e)}
})
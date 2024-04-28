const express = require('express')
const router = express.Router();
const {
    processPayment,
    sendStripApi,
    confirmOrder
} = require('../controllers/paymentController')

const { isAuthenticatedUser } = require('../middlewares/userMiddleware')

router.route('/payment/process').post(isAuthenticatedUser, processPayment, confirmOrder);
router.route('/stripeapi').get(isAuthenticatedUser, sendStripApi);

module.exports = router;
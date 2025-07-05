const express = require('express');
const router = express.Router();
const voucherController = require('../controllers/voucherController');

// Route to validate a voucher
router.post('/validate', voucherController.validateVoucher);

// Route to create a new voucher
router.post('/create', voucherController.createVoucher);

// Route to get all vouchers
router.get('/', voucherController.getVouchers);

// Route to delete certain voucher
router.get('/delete', voucherController.deleteVoucher)

module.exports = router;

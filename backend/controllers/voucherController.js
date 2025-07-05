const Voucher = require('../models/Voucher');

// Validate voucher code
exports.validateVoucher = async (req, res) => {
    const { code } = req.body;
  
    try {
      const voucher = await Voucher.findOne({ code });
  
      if (!voucher) {
        return res.status(404).json({ valid: false, message: 'Voucher not found' });
      }
  
      // Check if the voucher is expired
      if (new Date() > voucher.expires) {
        return res.status(400).json({ valid: false, message: 'Voucher is expired' });
      }
  
      // Check if the voucher is still available
      if (voucher.quantity <= 0) {
        return res.status(400).json({ valid: false, message: 'Voucher has been fully used.' });
      }
  
      // Decrease the quantity
      voucher.quantity -= 1;
      await voucher.save();
  
      res.status(200).json({
        valid: true,
        discount: voucher.discount,
        remainingUses: voucher.quantity,
        message: `Voucher applied successfully! ${voucher.quantity} uses left.`,
      });
    } catch (error) {
      console.error('Error validating voucher:', error.message);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  

// Create a new voucher
exports.createVoucher = async (req, res) => {
    const { code, discount, expires, quantity } = req.body;
  
    try {
      const voucher = new Voucher({ code, discount, expires, quantity });
      await voucher.save();
  
      res.status(201).json({ message: 'Voucher created successfully', voucher });
    } catch (error) {
      console.error('Error creating voucher:', error.message);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  

// Get all vouchers
exports.getVouchers = async (req, res) => {
    try {
      const vouchers = await Voucher.find();
      res.status(200).json(vouchers);
    } catch (error) {
      console.error('Error fetching vouchers:', error.message);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

  //delete voucher
  exports.deleteVoucher = async (req, res) => {
    try {
      const voucher = await Voucher.findByIdAndDelete(req.params.id); // Delete voucher by ID
      if (!voucher) {
        return res.status(404).json({ message: "voucher not found" });
      }
      res.status(200).json({ message: "voucher deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error deleting the order", error });
    }
  };
  

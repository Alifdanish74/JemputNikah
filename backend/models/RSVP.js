const mongoose = require("mongoose");

const RSVPFormSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String},
  dewasa: { type: Number },
  kanak: { type: Number },
  timeslot: { type: String },
  pihak: { type: String },
  ucapan: { type: String },
  status: { type: String, required: true, enum: ["Hadir", "Tidak Hadir"] },
});

const RSVPMainSchema = new mongoose.Schema({
  weddingCardId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "WeddingCard",
    required: true,
  },
  orderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Order",
    required: true,
  },
  submissions: [RSVPFormSchema], // Array of RSVP form data
});

module.exports = mongoose.model("RSVP", RSVPMainSchema);

const mongoose = require('mongoose');

const RSVPSchema = new mongoose.Schema({
  weddingCardId: { type: mongoose.Schema.Types.ObjectId, ref: 'WeddingCard', required: true },
  guestName: { type: String, required: true },
  guestPhone: { type: String, required: true },
  slotTime: String,
  totalAdults: Number,
  totalChildren: Number,
  weddingWish: String,
  isAttending: { type: Boolean, required: true }, // True for attend, false for not attending
}, { timestamps: true });

module.exports = mongoose.model('RSVP', RSVPSchema);

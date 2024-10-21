const mongoose = require('mongoose');

const WeddingCardSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  cardImage: { type: String, required: true },
  brideInfo: {
    eventSide: String,
    fontType: String,
    groomShortName: String,
    groomFullName: String,
    brideShortName: String,
    brideFullName: String,
    fatherName: String,
    motherName: String,
    bridePhoto: String,
  },
  eventInfo: {
    eventTitle: String,
    introduction: String,
    introWords: String,
    eventDate: Date,
    startTime: String,
    endTime: String,
    location: String,
    fullAddress: String,
    googleMapsLink: String,
    wazeLink: String,
    emergencyContacts: [{ name: String, phone: String }],
    eventTentative: [{ time: String, title: String }],
  },
  moneyGift: {
    bankName: String,
    bankAccNumber: String,
    qrCodeImage: String,
  },
  rsvpInfo: {
    maxInvitation: Number,
    maxInvitationPerRSVP: Number,
    lastDateForRSVP: Date,
    rsvpSlots: [{ time: String }],  // Customizable
  },
  extraInfo: {
    music: String,
    galleryImages: [String],
    doa: String,
    frameImage: String,
    dressCode: String,
    extraInfo: String,
    weddingHashtag: String,
    phoneNumber: String,
  }
}, { timestamps: true });

module.exports = mongoose.model('WeddingCard', WeddingCardSchema);

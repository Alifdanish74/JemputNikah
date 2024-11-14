const mongoose = require("mongoose");

const WeddingCardSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true, // This ensures the wedding card is associated with a user
    },
    userPhone: {
      type: "String",
      required: true, // This ensures the wedding card is associated with a user
    },
    userName: {
      type: "String",
      required: true, // This ensures the wedding card is associated with a user
    },
    price: { type: "String", required: true },
    pakej: { type: String, default: "Istanbul" },
    designName: { type: String },
    designId: { type: mongoose.Schema.Types.ObjectId, ref: "CardDesign" },
    designUrl: { type: String },
    // Pengantin Section
    pihakMajlis: { type: String },
    jenisFont: { type: String },
    namaPenuhLelaki: { type: String },
    namaPendekLelaki: { type: String },
    namaPenuhPerempuan: { type: String },
    namaPendekPerempuan: { type: String },
    namaPenuhPasangan1: { type: String },
    namaPenuhPasangan2: { type: String },
    namaPendekPasangan1: { type: String },
    namaPendekPasangan2: { type: String },
    namaBapaPengantin: { type: String },
    namaIbuPengantin: { type: String },
    namaBapaPengantinL: { type: String },
    namaIbuPengantinL: { type: String },
    namaBapaPengantinP: { type: String },
    namaIbuPengantinP: { type: String },
    // gambarPengantin: { type: String }, // File path or URL for the image
    // Majlis Section
    tajukMajlis: { type: String, default: "Walimatulurus" },
    mukadimah: { type: String },
    ucapanAluan: { type: String },
    tarikhMajlis: { type: Date },
    majlisStart: { type: String },
    majlisEnd: { type: String },
    locationMajlis: { type: String },
    fullLocationMajlis: { type: String },
    googleMapsLink: { type: String },
    wazeLink: { type: String },
    emergencyContacts1: { type: String },
    emergencyNumber1: { type: String },
    emergencyContacts2: { type: String },
    emergencyNumber2: { type: String },
    emergencyContacts3: { type: String },
    emergencyNumber3: { type: String },
    emergencyContacts4: { type: String },
    emergencyNumber4: { type: String },

    // Majlis Guests
    eventTentativeTime1: { type: String },
    eventTentativeTitle1: { type: String },
    eventTentativeTime2: { type: String },
    eventTentativeTitle2: { type: String },
    eventTentativeTime3: { type: String },
    eventTentativeTitle3: { type: String },
    eventTentativeTime4: { type: String },
    eventTentativeTitle4: { type: String },
    eventTentativeTime5: { type: String },
    eventTentativeTitle5: { type: String },
    // Money Gift
    bankName: { type: String },
    accountNumber: { type: String },
    qrCode: { type: String }, // File path or URL for QR code image
    // RSVP
    maxInvitations: { type: Number, default: null },
    maxInvitationsDewasa: { type: Number, default: null },
    maxInvitationsKids: { type: Number, default: null },
    maxDate: { type: Date, default: null }, // Allows null values if needed},
    labelSlot1: { type: String },
    fromSlot1: { type: String },
    toSlot1: { type: String },
    labelSlot2: { type: String },
    fromSlot2: { type: String },
    toSlot2: { type: String },
    labelSlot3: { type: String },
    fromSlot3: { type: String },
    toSlot3: { type: String },

    // Lain-lain Info
    bgSongTitle: { type: String },
    bgSong: { type: String },
    gallery: [
      { type: String }, // File path or URL for gallery images
    ],
    doa: { type: String },
    dressCode: { type: String },
    extraInfo: { type: String },
    hashtag: { type: String },
    orderphone: { type: String },
    RSVPs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "RSVP",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("WeddingCard", WeddingCardSchema);

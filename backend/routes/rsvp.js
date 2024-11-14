const express = require("express");
const {
  submitRSVP,
  getRSVPs,
  getRSVPsByOrderNumber,
} = require("../controllers/rsvpController");

const router = express.Router();

// Route to submit RSVP form data
router.post("/submit-form", submitRSVP);

// Route to fetch RSVP data by weddingCardId
router.get("/:weddingCardId", getRSVPs);

router.get("/list/:orderNumber", getRSVPsByOrderNumber);

module.exports = router;

const express = require("express");
const {
  submitRSVP,
  getRSVPs,
  getRSVPsByOrderNumber,
  deleteRSVPSubmission,
  resetUcapan
} = require("../controllers/rsvpController");

const router = express.Router();

// Route to submit RSVP form data
router.post("/submit-form", submitRSVP);

// Route to fetch RSVP data by weddingCardId
router.get("/:weddingCardId", getRSVPs);

router.get("/list/:orderNumber", getRSVPsByOrderNumber);

// DELETE: Delete an RSVP submission
router.delete("/delete/:rsvpId/:submissionId", deleteRSVPSubmission);

// Reset ucapan
router.put("/reset-ucapan/:rsvpId/:submissionId", resetUcapan);

module.exports = router;

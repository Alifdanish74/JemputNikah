const RSVP = require("../models/RSVP");
const WeddingCard = require("../models/WeddingCard");
const Order = require("../models/Order");

// Submit RSVP form
exports.submitRSVP = async (req, res) => {
  const { weddingCardId, orderId, formData } = req.body;

  try {
    // Ensure the weddingCard and order exist
    const weddingCard = await WeddingCard.findById(weddingCardId);
    const order = await Order.findById(orderId);

    if (!weddingCard || !order) {
      return res.status(404).json({ message: "WeddingCard or Order not found" });
    }

    // Find existing RSVP or create a new one
    let rsvp = await RSVP.findOne({ weddingCardId, orderId });

    if (!rsvp) {
      rsvp = new RSVP({
        weddingCardId,
        orderId,
        submissions: [],
      });
    }

    // Add the new RSVP submission to the array
    rsvp.submissions.push(formData);

    // Save the RSVP
    await rsvp.save();

    res.status(200).json({ message: "RSVP submitted successfully", rsvp });
  } catch (error) {
    console.error("Error submitting RSVP:", error);
    res.status(500).json({ message: "Error submitting RSVP", error });
  }
};

// Get RSVP data for a specific weddingCardId
exports.getRSVPs = async (req, res) => {
  const { weddingCardId } = req.params;

  try {
    const rsvp = await RSVP.findOne({ weddingCardId }).populate("weddingCardId").populate("orderId");

    if (!rsvp) {
      return res.status(404).json({ message: "RSVP not found" });
    }

    res.status(200).json(rsvp);
  } catch (error) {
    console.error("Error fetching RSVP data:", error);
    res.status(500).json({ message: "Error fetching RSVP data", error });
  }
};

// Get RSVP data by orderNumber
exports.getRSVPsByOrderNumber = async (req, res) => {
  const { orderNumber } = req.params;

  try {
    // Find the order by orderNumber
    const order = await Order.findOne({ orderNumber }).populate("weddingCardId");

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Extract weddingCardId as an ObjectId
    const weddingCardId = order.weddingCardId?._id;

    if (!weddingCardId) {
      return res.status(404).json({ message: "Wedding Card ID not found in order" });
    }

    // Find the RSVP for the weddingCardId linked to the order
    const rsvp = await RSVP.findOne({ weddingCardId }).populate("weddingCardId").populate("orderId");

    if (!rsvp) {
      return res.status(404).json({ message: "RSVP not found" });
    }

    res.status(200).json(rsvp);
  } catch (error) {
    console.error("Error fetching RSVP data by orderNumber:", error);
    res.status(500).json({ message: "Error fetching RSVP data", error });
  }
};

// Delete an RSVP submission
exports.deleteRSVPSubmission = async (req, res) => {
  const { rsvpId, submissionId } = req.params;

  try {
    const rsvp = await RSVP.findById(rsvpId);
    if (!rsvp) {
      return res.status(404).json({ message: "RSVP not found" });
    }

    // Filter out the submission to delete
    rsvp.submissions = rsvp.submissions.filter(
      (submission) => submission._id.toString() !== submissionId
    );

    // Save updated RSVP
    await rsvp.save();

    res.status(200).json({ message: "RSVP submission deleted successfully" });
  } catch (error) {
    console.error("Error deleting RSVP submission:", error);
    res.status(500).json({ message: "Error deleting RSVP submission", error });
  }
};


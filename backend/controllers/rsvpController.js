const RSVP = require('../models/RSVP');

const createRSVP = async (req, res) => {
  const rsvp = new RSVP(req.body);
  await rsvp.save();
  res.json(rsvp);
};

// app.get("/test", (req, res) => {
//   res.json("test okey");
// });
const test = (req, res) => {
  res.json("test okey");
};

module.exports = { createRSVP, test };

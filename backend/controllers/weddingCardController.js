const WeddingCard = require('../models/WeddingCard');

const createWeddingCard = async (req, res) => {
  const weddingCard = new WeddingCard({ ...req.body, userId: req.userId });
  await weddingCard.save();
  res.json(weddingCard);
};

const getWeddingCard = async (req, res) => {
  const weddingCard = await WeddingCard.findById(req.params.id);
  res.json(weddingCard);
};

const updateWeddingCard = async (req, res) => {
  const weddingCard = await WeddingCard.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(weddingCard);
};

const deleteWeddingCard = async (req, res) => {
  await WeddingCard.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted successfully' });
};

module.exports = { createWeddingCard, getWeddingCard, updateWeddingCard, deleteWeddingCard };

// const express = require('express');
// const { createWeddingCard, getWeddingCard, updateWeddingCard, deleteWeddingCard } = require('../controllers/weddingCardController');
// const authMiddleware = require('../middleware/authMiddleware');
// const router = express.Router();

// router.post('/', authMiddleware, createWeddingCard);
// router.get('/:id', authMiddleware, getWeddingCard);
// router.put('/:id', authMiddleware, updateWeddingCard);
// router.delete('/:id', authMiddleware, deleteWeddingCard);

// module.exports = router;
const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const {
  createWeddingCard,
  getWeddingCardById,
  updateWeddingCard,
  deleteWeddingCard
} = require('../controllers/weddingCardController');

const router = express.Router();

// Create a new wedding card
router.post('/', authMiddleware, createWeddingCard);

// Get a wedding card by ID
router.get('/:id',authMiddleware,  getWeddingCardById);

// Update a wedding card
router.put('/:id',authMiddleware, updateWeddingCard);

// Delete a wedding card
router.delete('/:id',authMiddleware,  deleteWeddingCard);

module.exports = router;


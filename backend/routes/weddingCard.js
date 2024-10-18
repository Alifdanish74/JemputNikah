const express = require('express');
const { createWeddingCard, getWeddingCard, updateWeddingCard, deleteWeddingCard } = require('../controllers/weddingCardController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', authMiddleware, createWeddingCard);
router.get('/:id', authMiddleware, getWeddingCard);
router.put('/:id', authMiddleware, updateWeddingCard);
router.delete('/:id', authMiddleware, deleteWeddingCard);

module.exports = router;

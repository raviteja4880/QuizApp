// routes/results.js
const express = require('express');
const router = express.Router();
const Result = require('../models/Result');
const auth = require('../middleware/authMiddleware');

router.get('/myresults', auth, async (req, res) => {
  try {
    const results = await Result.find({ userId: req.user.id }).populate('quizId');
    res.json(results);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch results' });
  }
});

module.exports = router;

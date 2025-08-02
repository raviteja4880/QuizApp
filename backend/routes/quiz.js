const authenticate = require('../middleware/authenticate'); 
const express = require('express');
const Quiz = require('../models/Quiz');
const Result = require('../models/Result');
const auth = require('../middleware/authMiddleware');
const router = express.Router();

// Create quiz (admin)
router.post('/create', auth, async (req, res) => {
  const { title, description, timeLimit, questions } = req.body;
  const quiz = await Quiz.create({ title, description, timeLimit, questions });
  res.status(201).json(quiz);
});

// Get all quizzes
router.get('/', async (req, res) => {
  const quizzes = await Quiz.find().select('-questions.correctAnswer'); // hide answers
  res.json(quizzes);
});

// Get quiz by ID
router.get('/:id', async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    res.json(quiz);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching quiz' });
  }
});


// Submit quiz
router.post('/:id/submit', auth, async (req, res) => {
  const quiz = await Quiz.findById(req.params.id);
  const { answers } = req.body;

  let score = 0;
  quiz.questions.forEach((q, i) => {
    if (q.correctAnswer === answers[i]) score++;
  });

  const result = await Result.create({
    userId: req.user.id,
    quizId: quiz._id,
    score,
    total: quiz.questions.length
  });

  res.json({ resultId: result._id });
});

// Get result
router.get('/myresults', authenticate, async (req, res) => {
  const result = await Result.findById(req.params.id);
  res.json(result);
});

// DELETE /api/quiz/:id
router.delete('/:id', auth, async (req, res) => {
  try {
    const deletedQuiz = await Quiz.findByIdAndDelete(req.params.id);
    if (!deletedQuiz) {
      return res.status(404).json({ message: 'Quiz not found' });
    }
    res.json({ message: 'Quiz deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting quiz', error: err.message });
  }
});

// my results
router.get('/myresults', authenticate, async (req, res) => {
  try {
    const results = await Result.find({ user: req.user.id }).populate('quiz', 'title');
    const formatted = results.map(r => ({
      quizTitle: r.quiz.title,
      score: r.score,
      total: r.total,
    }));
    res.json(formatted);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching results' });
  }
});



module.exports = router;

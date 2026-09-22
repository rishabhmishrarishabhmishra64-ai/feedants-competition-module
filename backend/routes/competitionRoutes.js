const express = require('express');
const router = express.Router();
const { 
  createCompetition, 
  getAllCompetitions, 
  getCompetitionById,
  updateCompetition,
  deleteCompetition
} = require('../models/Competition');

router.post('/', async (req, res) => {
  try {
    const competition = await createCompetition(req.body);
    res.status(201).json(competition);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const competitions = await getAllCompetitions();
    res.json(competitions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const competition = await getCompetitionById(req.params.id);
    if (!competition) return res.status(404).json({ error: 'Not found' });
    res.json(competition);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

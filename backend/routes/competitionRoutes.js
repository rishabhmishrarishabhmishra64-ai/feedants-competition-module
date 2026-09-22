const express = require('express');
const router = express.Router();
const Competition = require('../models/Competition');

router.get('/', async (req,res)=>{
  try{
    const comps = await Competition.find();
    res.json(comps);
  }catch(e){ res.status(500).json({message:e.message}) }
});

router.post('/', async (req,res)=>{
  try{
    const comp = new Competition(req.body);
    await comp.save();
    res.status(201).json(comp);
  }catch(e){ res.status(400).json({message:e.message}) }
});

module.exports = router;

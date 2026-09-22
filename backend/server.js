const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Competition = require('./models/Competition');
const competitionRoutes = require('./routes/competitionRoutes');

const app = express();
app.use(cors());
app.use(express.json());

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/feedants';
mongoose.connect(MONGO_URI).then(()=> console.log("Mongo Connected")).catch(e=> console.log(e));

app.use('/api/competitions', competitionRoutes);

app.get('/api/competitions/:id', async (req,res)=>{
 try{
  const comp = await Competition.findById(req.params.id);
  if(!comp) return res.status(404).json({message:"Not found"});
  res.json({ competition: comp, remainingSpots: comp.totalSpots - comp.filledSpots, serverTime: new Date() });
 }catch(e){ res.status(500).json({message:e.message}) }
});

app.post('/api/competitions/:id/register', async (req,res)=>{
 try{
   const comp = await Competition.findOneAndUpdate(
     { _id: req.params.id, $expr: { $lt: ["$filledSpots", "$totalSpots"] } },
     { $inc: { filledSpots: 1 } },
     { new: true }
   );
   if(!comp) return res.status(400).json({success:false, message:"Spots Full"});
   res.json({success:true, competition: comp, remainingSpots: comp.totalSpots - comp.filledSpots});
 }catch(e){ res.status(500).json({success:false, message:e.message}); }
});

if (require.main === module) {
  app.listen(5000, ()=> console.log("Server on 5000"));
}
module.exports = app;

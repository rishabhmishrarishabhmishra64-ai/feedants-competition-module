const mongoose = require('mongoose');

const CompetitionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  totalSpots: { type: Number, required: true },
  filledSpots: { type: Number, default: 0 },
  registrationDeadline: { type: Date, required: true },
  status: { type: String, enum: ['open', 'closed', 'full'], default: 'open' }
});

module.exports = mongoose.model('Competition', CompetitionSchema);

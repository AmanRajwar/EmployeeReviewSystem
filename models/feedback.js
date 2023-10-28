

const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  performanceReview: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'PerformanceReview',
  },
  reviewer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee',
  },
  feedbackText: {
    type: String,
    required: true,
  },
});

const Feedback = mongoose.model('Feedback', feedbackSchema);
module.exports = Feedback;


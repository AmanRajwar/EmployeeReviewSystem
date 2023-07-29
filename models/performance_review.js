
const mongoose = require('mongoose');

const performanceReviewSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  employee:{ // for whom performance review is created
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee',
  },
  assignedTo: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee',
  }]
});

const PerformanceReview = mongoose.model('PerformanceReview', performanceReviewSchema);
module.exports = PerformanceReview;



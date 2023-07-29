const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    set: capitalizeFirstLetter,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password:{
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  performanceReview:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'PerformanceReview',
  }]
});


// Custom setter function to capitalize the first letter
function capitalizeFirstLetter(value) {
  if (typeof value !== 'string') return value; // Make sure it's a string
  return value.charAt(0).toUpperCase() + value.slice(1);
}


   const Employee = mongoose.model('Employee', employeeSchema);
   module.exports =Employee;
// const mongoose = require('mongoose');

// mongoose.connect('mongodb://127.0.0.1/employee_review');
// const db =mongoose.connection;
// db.on('error',console.error.bind(console,"error connecting to the database"));

// db.once('open',()=>{
//     console.log("successfully connected to the database");
// });

const mongoose = require('mongoose');

// const connectionOptions = {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// };


const dbURI = process.env.MONGODB_URI;

mongoose.connect(dbURI);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Error connecting to the database:'));

db.once('open', () => {
  console.log('Successfully connected to the database');
});


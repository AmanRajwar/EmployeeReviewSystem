// const mongoose = require('mongoose');

// mongoose.connect('mongodb://127.0.0.1/employee_review');
// const db =mongoose.connection;
// db.on('error',console.error.bind(console,"error connecting to the database"));

// db.once('open',()=>{
//     console.log("successfully connected to the database");
// });

const mongoose = require('mongoose');

const connectionOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};


const dbURI = 'mongodb+srv://czarop79:czarop79@cluster0.qyz2iwp.mongodb.net/employee_review?retryWrites=true&w=majority';

mongoose.connect(dbURI, connectionOptions);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Error connecting to the database:'));

db.once('open', () => {
  console.log('Successfully connected to the database');
});


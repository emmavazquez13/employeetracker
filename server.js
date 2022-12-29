const express = require('express');
// Import and require mysql2
const connection = require('./config/connection')

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// connection.query('select * from roles;', (err, data) => {
//     if (err) console.log(err)
//     console.log(data)
// })
// let initialQuestions = [{
//     type: 'list', 
//     name: ''
// }]

let startApp = () => {

}


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
  
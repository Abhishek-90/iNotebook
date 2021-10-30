const express = require('express');
const {connectToMongoose} = require('./db.js') //Returns SingleTon object
var cors = require('cors');

connectToMongoose();

const app = express();
app.use(cors());
const port = 5000;

app.use(express.json());

//Available Routes
app.use('/auth',require('./routes/auth'));
app.use('/notes',require('./routes/notes'));

app.listen(port, () => {
  console.log(`iNoteBook listening at http://localhost:${port}`)
});
const express = require('express');
const {connectToMongoose} = require('./db.js') //Returns SingleTon object

connectToMongoose();

const app = express()
const port = 5000

app.use(express.json())

//Available Routes
app.use('/auth',require('./routes/auth'));
app.use('/notes',require('./routes/notes'));



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
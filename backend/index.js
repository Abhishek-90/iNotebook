const express = require('express');
const {connectToMongoose} = require('./db.js') //Returns SingleTon object

connectToMongoose();

const app = express()
const port = 5000

app.use(express.json())

//Available Routes
app.post('/auth/user',require('./routes/auth'));
app.post('/auth/login',require('./routes/auth'));
app.post('/auth/getuser',require('./routes/auth'));


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
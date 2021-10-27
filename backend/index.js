const express = require('express');
const mongoDbConnect = require('./db.js')

mongoDbConnect();
const app = express()
const port = 5000

app.use(express.json())

//Available Routes
// app.use('/auth/user', require('./routes/auth'));
app.post('/auth/user',require('./routes/auth'));
app.post('/auth/login',require('./routes/auth'));


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
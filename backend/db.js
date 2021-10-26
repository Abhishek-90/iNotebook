const mongoose = require('mongoose');
const mongooseUri = 'mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&ssl=false';

const connectToMongoose = () => {
    mongoose.connect(mongooseUri,()=>{
        console.log('Connected to Mongoose DB');
    })
}

module.exports = connectToMongoose;
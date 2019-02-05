const mongoose = require('mongoose');

const { Schema } = mongoose;
const EmailSchema = new Schema({
  name: String,
});


const Email = mongoose.model('Email', EmailSchema);
module.exports = Email;

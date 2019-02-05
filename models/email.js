const mongoose = require('mongoose');

const { Schema } = mongoose;
const EmailSchema = new Schema({
  emailAddress: String,
});



const Email = mongoose.model('Email', EmailSchema);
module.exports = Email;

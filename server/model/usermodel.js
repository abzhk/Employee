const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  mobile: { type: String, required: true },
  address: { type: String, required: true },
  aadhar: { type: String, required: true },
  role: { type: String, enum: ['employee', 'manager'], default: 'employee' },
  generatedId: { type: String, required: true, unique: true },
}, {
  timestamps: true,
});


module.exports = mongoose.model('User', userSchema);

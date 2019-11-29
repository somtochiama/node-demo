const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: String,
    email: { type: String, required: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false},
    created_at: { type: Date, default: Date.now}
})

module.exports = mongoose.model('User', userSchema);

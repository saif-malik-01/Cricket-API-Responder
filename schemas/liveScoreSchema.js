const mongoose = require('mongoose');

const lives = new mongoose.Schema({
    match:Object
})

module.exports = mongoose.model('live',lives);
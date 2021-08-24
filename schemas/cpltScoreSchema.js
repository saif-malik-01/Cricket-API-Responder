const mongoose = require('mongoose');

const scores = new mongoose.Schema({
    match:Object
})

module.exports = mongoose.model('score',scores);
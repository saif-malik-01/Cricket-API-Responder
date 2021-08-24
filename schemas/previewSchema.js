const mongoose = require('mongoose');

const details = new mongoose.Schema({
    match:Object
})

module.exports = mongoose.model('detail',details);
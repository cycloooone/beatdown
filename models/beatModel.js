var mongoose = require('mongoose');
var schema = new mongoose.Schema({
    title: {
        type: String,
    },
    author: {
        type: String,

    },
    music: {
        type: String,
    },
    
});
var beat = new mongoose.model('Beats', schema);
module.exports = beat;
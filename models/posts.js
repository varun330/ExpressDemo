const mongoose = require('mongoose');

const Schema = mongoose.Schema;

var PostSchema = new mongoose.Schema({
    title: {type: String,
            default: ''
        },
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    comments: [{
        text: String,
        commentBy: String,
        default: ''
    }]
});

module.exports = mongoose.model("Posts", PostSchema);
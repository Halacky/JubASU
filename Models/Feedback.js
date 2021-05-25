const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const moment = require("moment");

const feedbackSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    group:{
        type: String,
        required: true
    },
    city:{
        type: String,
        required: false
    },
    placeOfWork:{
        type: String,
        required: false
    },
    feedback:{
        type: String,
        required: true
    },
    date:{
        type: String,
        default: moment.now
    },
    imageSrc:{
        type: String,
        default: ''
    },
    coor:{
        type: String,
        required: false
    },
    mail:{
        type: String,
        required: false
    }
});

module.exports = mongoose.model("feedbakcs", feedbackSchema);
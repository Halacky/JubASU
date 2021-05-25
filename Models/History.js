const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const historySchema = new Schema({
    year:{
        type: Number
    },
    imgSrc:{
        type: String,
        default: ''
    },
    description:{
        type: String
    }
});

module.exports = mongoose.model("history", historySchema);
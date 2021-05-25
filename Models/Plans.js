const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const planSchema = new Schema({
    course:{
        type: Number,
        required: true
    },
    description:{
        type:String,
        required: true
    },
    moreInfo:{
        type:String,
        required: true
    }
});

module.exports = mongoose.model("plans", planSchema);
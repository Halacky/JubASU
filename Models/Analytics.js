const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const analyticsSchema = new Schema({
    year:{
        type: Number,
        required: true
    },
    coutOfGrad:{
        type: Number
    },
    coutOfStud:{
        type: Number
    }
});

module.exports = mongoose.model("analytics", analyticsSchema);
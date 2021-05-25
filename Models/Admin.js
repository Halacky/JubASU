const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const adminSchema = new Schema({
    login:{
        type:String,    //Тип поля
        required: true, //поле обязательно
        unique: true
    },
    password:{
        type:String,    //Тип поля
        required: true //поле обязательно
    }
});

module.exports = mongoose.model("users", adminSchema);
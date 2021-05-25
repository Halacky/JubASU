const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const galerySchema = new Schema({
    // name: {
    //     type: String
    // },
    // img:
    // {
    //     data: Buffer,
    //     contentType: String
    // }

    imageSrc: {
        type: String
      },
});

module.exports = mongoose.model("galery", galerySchema);
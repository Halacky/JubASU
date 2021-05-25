const history = require("../Models/History");

module.exports.getHistory = function(req,res){
    // const hist = history.find();
    // res.status(200).json(hist);

    res.json("hist get");

}
const memories = require("../Models/Memories");
const plans = require("../Models/Plans");


module.exports.getAll = function(req,res){
    res.json({
        anal: "main anal get",
        memo: "main memo get",
        plan: "main plan get"
    });
}
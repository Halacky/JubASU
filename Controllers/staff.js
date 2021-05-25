const Staff = require("../Models/Staff");
const eventHandler = require("../utils/eventHandler");

module.exports.getStaff = async function(req,res){
    // try{
    //     const staff = await Staff.find();
    //     res.status(200).json(staff);
    // }catch(e){
    //     eventHandler(res,e);
    // }
    res.json("staff get");
    
}
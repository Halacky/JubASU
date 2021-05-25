const bcryptsj = require("bcryptjs"); // библа для хэша
const jwt = require("jsonwebtoken"); // библа для токена
const Admin = require("../Models/Admin");
const keys = require("../config/keys");
const eventHandler = require("../utils/eventHandler");

module.exports.login = async function(req,res){
    const candidate = await Admin.findOne({login: req.body.login});
    
    if(candidate){
        // Пользователй найден в базе, проверка пароля
        const passIsEq = bcryptsj.compareSync(req.body.password, candidate.password);
        if(passIsEq){
        // Генерация токена, если пароли совпали

        const token = jwt.sign({
            login: candidate.login,
            adminId: candidate._id
        }, keys.jwt, {expiresIn: 60*60});

        res.status(200).json({
            token: `Bearer ${token}`
        }); 
        }else{
            res.status(401).json({
                message:"Password is not equal. Try again"
            })
        }
    }else{
        res.status(404).json({
            message: "User with these login not exist"
        })
    }
}

module.exports.register = async function(req,res){    
    const canditae = await Admin.findOne({login:req.body.login});
    if(canditae){
        res.status(409).json({message: "User already exist"});
    }else{
        const password = req.body.password;
        const salt = bcryptsj.genSaltSync(16); // Генерация хэша для пароля. 
        const admin = new Admin({
            login: req.body.login,
            password: bcryptsj.hashSync(password, salt) 
        });

        try{
            await admin.save();
            res.status(201).json(admin);
        }catch(e){
            eventHandler(res,e)
        }
    }
}

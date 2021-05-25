const strategyJwt = require("passport-jwt").Strategy;
const extractJwt = require("passport-jwt").ExtractJwt;
const keys = require("../config/keys");
const Admins = require("../Models/Admin");

const options={
    jwtFromRequest: extractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: keys.jwt
};

module.exports = (passport) => {
    passport.use(
        new strategyJwt(options, async (payload, done)=>{
            try{
                const admin = await Admins.findById(payload.adminId).select('login id'); //admibId берем из токена который мы создавали в auth.js 
            
                if(admin){
                    done(null, admin);
                }else{
                    done(null, false);
                }
            }catch(e){
                console.log(e);
            }
            
        })
    );
    
}
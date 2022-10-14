let LocalStrategy   = require('passport-local').Strategy;
let User = require('../models/usuario');
let bCrypt = require('bcrypt');
const {userService} = require("../services/index.js")

module.exports= function (passport){

	passport.use('login', new LocalStrategy({
        passReqToCallback : true 
        },
        async (req, email, password, done) => {
        try { 
            const user = await userService.getUser(email);
            if (!user || !isValidPassword(user, password)) {
                return done("Invalid credentials", false);
            }
            console.log("Se ha encontrado al usuario")
            return done(null, user);
            
        } catch (err) {
                done(err);
        }
        
        })
    );

   //Desencriptar Password (cifrado)
    function isValidPassword (user, password){
        return bCrypt.compareSync(password, user.password);
    }
    
}
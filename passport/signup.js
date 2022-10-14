const LocalStrategy   = require('passport-local').Strategy;
const User = require( '../models/usuario.js');
const bCrypt = require( 'bcrypt');
const transporter = require("../mailer/mailer.js")
const {userService} = require("../services/index.js")

module.exports = function (passport){
	passport.use('register', new LocalStrategy({
            passReqToCallback : true 
        },
        async (req, email, password, done)=> {
            try {	
                const existingUser = await userService.getUser(email);
                    if (existingUser) return done(null, false, 'Ya existe el usuario')
                const newUser = {
                    email: req.body.username,
                    password: hashPassword(password),
                    name: req.body.name,
                    address: req.body.address,
                    age: req.body.age,
                    phone: req.body.phone,
                    avatar : `http://localhost:8080/image/${req.file.filename}`,

                };
   
                const mailOptions = {
                  from: "Servidor Node",
                  to: "francesca.howell64@ethereal.email",
                  subject: "Nuevo registro",
                  html: `<h1>Nuevo usuario:</h1>
                  <h2>Email: ${newUser.email}</h2>
                  <h2>Nombre: ${newUser.name}</h2>
                  <h2>Dirección: ${newUser.address}</h2>
                  <h2>Edad: ${newUser.age}</h2>
                  <h2>Telf: ${newUser.phone}</h2>
                  <h2>Avatar: ${newUser.avatar}</h2>`,
                };
                
                async function enviarInfo() {
                  const info = await transporter.sendMail(mailOptions);
                  console.log(info);
                }
                try {
                  enviarInfo()
                } catch (error) {
                  console.log(error);
                }                

                const createdUser = await userService.createUser(newUser);
                    return done(null, createdUser);
                    } catch (err) {
                        console.log(err);
                        done(err);
                    }
        })
            
     );
            
    // Encriptar Password (cifrado) usando bCrypt
    function hashPassword(password){
        return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
    }  

}


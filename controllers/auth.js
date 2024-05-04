const { response, request } = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuario');
const {generarJWT} = require('../helpers/generar-jwt');
const jwt = require('jsonwebtoken');
const { transporter } = require('../helpers/mailer');

const login = async (req=request, res=response) => {
    const {correo, password} = req.body;

    try{
        const usuario = await Usuario.findOne({correo});

        //verificar si el correo existe
        if(!usuario){
            return res.status(400).json({
                msg: 'Correo o password incorrectos',
            })
        }

        //el usuario este activo
        if(!usuario.estado){
            return res.status(400).json({
                msg: 'Correo o password incorrectos | usuario inactivo',
            })
        }

        //verificar la contraseña
        const validPassword = bcrypt.compareSync(password, usuario.password);
        if(!validPassword){
            return res.status(400).json({
                msg: 'Correo o password incorrectos',
            })
        }

        //generar el token
        const token = await generarJWT(usuario.id);

        res.json({
            msg: 'Login OK',
            usuario,
            token
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Hable con el administrador'
        })
    } 
}

const forgotPassword = async (req, res) => {

    const { correo } =  req.body;
    if(!correo){
        return res.status(400).json({msg: 'El correo es requerido'});
    }
    const message = 'Verifica en tu email el link para resetear tu contraseña';
    let verificationLink;
    let emailStatus = 'OK';
    let email;
    try {
        const user = await Usuario.findOne({correo});
        const uid = user.id;
        email = user.correo;
        const token = jwt.sign({uid},process.env.SECRETORPRIVATEKEY,{ expiresIn:'10m'});
        verificationLink = `http://localhost:3000/new-password/${token}`;//modificar con el link del front 
        user.resetToken = token;
        await user.save();
    } catch (error) {
        return res.json({message});
    }
    
    //ToDo send Email
    try {
        await transporter.sendMail({
            from: '"Forgot password 👻" <cambalache86i@gmail.com>', // sender address
            to: email, // list of receivers
            subject: "Forgot password ✔", // Subject line
            html: `
                <b>Por favor entre al siguiente link para continuar con el proceso de recuperar la contraseña</b>
                <a href="${verificationLink}">${verificationLink}</a>`
          });
    } catch (error) {
        emailStatus = error;
        return res.status(400).json({msg: 'Algo salió mal1'})
    }

    res.json({
        message, 
        verificationLink,
        info: emailStatus
    });
}

const createPassword = async (req, res) =>{

    const { password } = req.body;
    const resetToken = req.header('x-token');

    if(!(resetToken && password)){
        res.status(400).json({msg: 'Todos los campos son requeridos'});
    }

    try {
        const jwtPayLoad = jwt.verify(resetToken, process.env.SECRETORPRIVATEKEY);
        const user = await Usuario.findOne({resetToken});
        if (!user) {
            return res.status(404).json({msg: 'Usuario no encontrado'});
        }
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        user.password = hash;
        await user.save();
    } catch (error) {
        return res.status(401).json({msg:'Algo no salió bien'});
    }
    res.json({msg: 'Se actualizó la contraseña correctamente'});

}

module.exports = {
    login,
    forgotPassword,
    createPassword
}
const { compare } = require("bcryptjs")
const {Router} = require("express")
const rutasUsuarios = Router()
const {usuarioModel} = require("../modelos/modeloUsuarios")


rutasUsuarios.get("/registrar", async function(req, res){
    try {
        const usuarios = await usuarioModel.find({},{usuario:1,_id:0}) 
        res.send(usuarios)
    } catch(error){
        console.log("error en registrar(get)")
    }
})


rutasUsuarios.post("/registrar", function(req, res){
    try {
        const usuario  = req.body
        const nuevoUsuario = new usuarioModel(usuario)

        nuevoUsuario.save(function(error){
            if (error){
                console.log(error)
                return res.status(500).send({msg:"Usuario no guardado"})
            }
    
            return res.status(200).send({msg:"Guardado con exito"})
        })
    }
    catch (error) {
        console.log("error en registrar(post): ",error)
    }
})


rutasUsuarios.post("/iniciar", async function(req,res){
    try {
        const {email,contrasena}  = req.body
        const encontrado = await usuarioModel.findOne({email})

        if (!encontrado){
            return res.send({estado:"invalido", msg:"Correo o contraseña incorrectos"})
        }

        //comprobar contraseña
        const validarContra = await compare(contrasena, encontrado.contrasena)
        if (validarContra) {
            return res.status(200).send({estado:"valido"})
        } else {
            return res.status(401).send({estado:"invalido", msg:"Correo o contraseña incorrectos"})
        }

    } catch (error) {
        console.log("error en iniciar(post): ",error)
    }
})


exports.rutasUsuarios = rutasUsuarios
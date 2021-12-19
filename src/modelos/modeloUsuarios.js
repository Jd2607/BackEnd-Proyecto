const mongoose = require("mongoose")
const Schema = mongoose.Schema
const {genSalt, hash} = require("bcryptjs")

const modelo = new Schema({
    nombres:{
        type:"string",
        required:true
    },
    apellidos:{
        type:"string",
        required:true
    },
    email:{
        type:"string",
        required:true,
        match: /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/
    },
    usuario:{
        type:"string",
        required:true,
        unique: true
    },
    contrasena:{
        type:"string",
        required:true
    },
    permisos:{
        type:"number",
        required:true,
        //enum es para indicar los valores que puede tomar el campo, si es diferente de estos no se puede guardar
        enum: [1,2,3],
        default: 1
    },
})

//esto es para realizar el hash
modelo.pre("save", async function(next){
    const salt = await genSalt(10)
    this.contrasena = await hash(this.contrasena, salt)
    next()
})

const usuarioModel = mongoose.model("usuarios", modelo)

exports.usuarioModel = usuarioModel
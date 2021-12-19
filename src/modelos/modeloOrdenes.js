const mongoose = require("mongoose")
const Schema = mongoose.Schema

const modelo = new Schema({
    id:{
        type:"string",
        unique: true,
        required: true
    },
    cliente:{
        type:"string",
        required:true
    },
    idCliente:{
        type:"number",
        required: true
    },
    producto:{
        type:"string",
        required:true
    },
    peso:{
        type:"number",
        required: true
    },
    descripcion:{
        type:"string",
        required:true
    },
    vehiculos:{
        type:"number",
        required: true
    },
    origen:{
        type:"string",
        required:true
    },
    destino:{
        type:"string",
        required:true
    },
    valor:{
        type:"number",
        required: true
    },
    estado:{
        type:"string",
        required:true,
        default: "en espera",
        enum: ["aceptada","en espera","denegada","despachada"]
    },
    distancia:{
        type:"number",
        required: true
    }
})

const ordenModel = mongoose.model("ordenes", modelo)

exports.ordenModel = ordenModel
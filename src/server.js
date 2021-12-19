const express = require("express")
const app = express()
const cors = require("cors")
const mongoose = require("mongoose")
const {rutasOrdenes} = require("./rutas/rutasOrdenes")
const {rutasUsuarios} = require("./rutas/rutasUsuarios")


app.use(cors())
app.use(express.json())


mongoose.connect("mongodb://127.0.0.1:27017/proyectoMinTic")
.then(res => console.log("Conexion a base de datos exitosa"))
.catch(err => console.log("error :" + err))


app.use("/orden", rutasOrdenes)
app.use("/usuario", rutasUsuarios)


app.listen(8081, ()=>{
    console.log("servidor corriendo en el puerto 8081")
})

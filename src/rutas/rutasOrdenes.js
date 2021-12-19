const {Router} = require("express")
const rutasOrdenes = Router()
const {ordenModel} = require("../modelos/modeloOrdenes")

rutasOrdenes.get("/pendientes", async function(req,res){
    try {
        //.find es para realizar una busqueda, le enviamos de parametro un json que corresponde a la condicion de la busqueda
        const ordenes = await ordenModel.find({estado:"en espera"})
        
        if (ordenes){
            res.send(ordenes)
        } 
    } 
    catch (error) {
        console.log("Error en ordenes pendientes: " , error)
    }
    
})


rutasOrdenes.get("/historial/:user", async function(req,res){
    try {
        const nombreCliente = req.params.user

        const ordenes = await ordenModel.find({cliente:nombreCliente})
        res.send(ordenes)
    } 
    catch (error) {
        console.log("Error en historial de ordenes: " , error)
    }
})


rutasOrdenes.post("/nueva-orden", async function(req,res){
    try {
        const orden = req.body
        const nuevaOrden = new ordenModel(orden)

        nuevaOrden.save(function(error){
            if (error){
                console.log(error)
                return res.status(500).send({msg:"No se ha podido guardar la orden"})
            }
    
            return res.status(200).send({msg:"Orden guardada con exito con exito"})
        })

    } 
    catch (error) {
        console.log("Error en historial de ordenes: " , error)
    }
})

rutasOrdenes.post("/cambiar-estado", async function(req,res){
    const {id,estado} = req.body

    const actualizar = await ordenModel.updateOne({id},{estado})

    if (actualizar.modifiedCount == 1){
        res.send({estado:"valido",msg:"Orden actualizada con exito"})
    } else {
        res.send({estado:"invalido",msg:"La orden no se ha podido actualizar"})
    }
})


exports.rutasOrdenes = rutasOrdenes
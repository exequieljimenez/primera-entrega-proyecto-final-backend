const express = require("express");
const { reset } = require("nodemon");
const ContenedorProductos = require("../contenedores/ContenedorProductos")

const Router = require("express").Router;

const routerProductos = Router()

routerProductos.use(express.json());
routerProductos.use(express.urlencoded({extended: true}))

function crearErrorNoEsAdmin(ruta, metodo) {
    const error = {
        error: -1,
    }
    if(ruta && metodo) {
        error.descripcion = `ruta '${ruta}' metodo '${metodo}' no autorizado`
    } else {
        error.descripcion = 'no autorizado'
    }
    return error
}

const administrador = true

function soloAdmins(req, res, next) {
    if(!administrador) {
        res.json(crearErrorNoEsAdmin(req.url, req.method))
    } else {
        next()
    }
}

const contenedorProductos = new ContenedorProductos("../app/db/dbProductos.json")


routerProductos.get('/', async (req, res) => {
    const productos = await contenedorProductos.getAll()
    res.send({productos})
})


routerProductos.get("/:id", async (req, res) => {
    const id = req.params.id
    const producto = await contenedorProductos.getById(id);
    res.send({producto})
})


routerProductos.post("/", soloAdmins, async (req, res) => {
    const data = req.body;
    await contenedorProductos.save(data);
    res.send("Producto guardado")
})


routerProductos.delete("/:id", soloAdmins, async (req, res) => {
    const id = req.params.id
    await contenedorProductos.deleteById(id)
    res.send("Producto eliminado")
})


routerProductos.put("/:id", soloAdmins, async (req, res) => {
    const id = req.params.id
    const data = req.body
    await contenedorProductos.updateProduct(id, data)
    res.send("producto modificado")
})


module.exports = routerProductos
const express = require("express");
const ContenedorProductos = require("../contenedores/ContenedorProductos")
const ContenedorCarritos = require("../contenedores/ContenedorCarritos")
const Router = require("express").Router;

const routerCarritos = Router()

routerCarritos.use(express.json());
routerCarritos.use(express.urlencoded({extended: true}))

const contenedorProductos = new ContenedorProductos("../app/db/dbProductos.json")
const contenedorCarritos = new ContenedorCarritos("../app/db/dbProductos.json", "../app/db/dbCarritos.json")

routerCarritos.get('/:id/productos', async (req, res) => {
    const id = req.params.id
    const productos = await contenedorCarritos.getProductos(id)
    res.send({productos})
})

routerCarritos.delete('/:id/productos/:id_prod', async (req, res) => {
    const idCarrito = req.params.id
    const idProducto = req.params.id_prod
    await contenedorCarritos.deleteProduct(idCarrito, idProducto)
    res.send("Producto borrado")
})

routerCarritos.post('/', async (req, res) => {
    const idCarrito = await contenedorCarritos.crearCarrito()
    res.send({idCarrito})
})

routerCarritos.delete('/:id', async (req, res) => {
    const id = req.params.id
    await contenedorCarritos.borrarCarrito(id)
    res.send("carrito borrado")
})

routerCarritos.post('/:id/productos/:id_prod', async (req, res) => {
    const idCarrito = req.params.id
    const idProducto = req.params.id_prod
    await contenedorCarritos.addProduct(idCarrito, idProducto)
    res.send("producto agregado")
})

module.exports = routerCarritos
const fs = require("fs")

class ContenedorCarritos {
    constructor(pathProductos, pathCarritos) {
        this.pathProductos = pathProductos
        this.pathCarritos = pathCarritos
    }

    async crearCarrito() {
        try {
            const leer = await fs.promises.readFile(this.pathCarritos, "utf-8")
            const data = JSON.parse(leer)
            const onlyIds = data.map((carrito) => carrito.id)
            const largestId = Math.max.apply(Math, onlyIds)
            const id = largestId + 1
            const timestamp = Date.now()
            const nuevoCarrito = { id: id, timestamp: timestamp, productos: [] }
            data.push(nuevoCarrito)
            await fs.promises.writeFile(this.pathCarritos, JSON.stringify(data))
            return id
        } catch (error) {
            console.log('No se pudo escribir el archivo', error);
        }
    }

    async borrarCarrito(id) {
        try {
            const leer = await fs.promises.readFile(this.pathCarritos, "utf-8")
            const data = JSON.parse(leer)
            const objectWithId = data.find((producto) => producto.id == id)
            objectWithId.productos = []
            const minusOne = data.filter((producto) => producto.id != id)
            await fs.promises.writeFile(this.pathCarritos, JSON.stringify(minusOne))
        } catch (error) {
            console.log("No se pudo realizar la operacion", error);
        }
    }


    async getProductos(id) {
        try {
            const leer = await fs.promises.readFile(this.pathCarritos, "utf-8")
            const data = JSON.parse(leer)
            const objectWithId = data.find((carrito) => carrito.id == id)
            return objectWithId.productos
        } catch (error) {
            console.log(("No se pudo acceder a los datos", error));
        }
    }

    async addProduct(idCarrito, idProducto) {
        try {
            const leerCarrito = await fs.promises.readFile(this.pathCarritos)
            const leerProductos = await fs.promises.readFile(this.pathProductos)
            let dataCarrito = JSON.parse(leerCarrito)
            const dataProductos = JSON.parse(leerProductos)
            const productById = dataProductos.find((producto) => producto.id == idProducto)
            const cartById = dataCarrito.find((carrito) => carrito.id == idCarrito)
            let id = 1
            if(cartById.productos.length === 0) {
                id = 1
            } else {
                const onlyIds = cartById.productos.map((carrito) => carrito.id)
                const largestId = Math.max.apply(Math, onlyIds)
                id = largestId + 1
            }
            productById.id = id
            cartById.productos.push(productById)
            const posicionCarrito = dataCarrito.findIndex((carrito) => carrito.id === idCarrito)
            dataCarrito[posicionCarrito] = cartById
            await fs.promises.writeFile(this.pathCarritos, JSON.stringify(dataCarrito))
        } catch (error) {
            console.log("No se pudo agregar el producto", error);
        }
    }
    async deleteProduct(idCarrito, idProducto) {
        try {
            const leer = await fs.promises.readFile(this.pathCarritos, 'utf-8')
            const data = JSON.parse(leer)
            const objectWithId = data.find((carrito) => carrito.id == idCarrito)
            const minusOne = objectWithId.productos.filter((producto) => producto.id != idProducto)
            objectWithId.productos = minusOne
            await fs.promises.writeFile(this.pathCarritos, JSON.stringify(objectWithId))
            
            
        } catch (error) {
            console.log("No se pudo realizar la operacion", error);
        }
    }
}

module.exports = ContenedorCarritos
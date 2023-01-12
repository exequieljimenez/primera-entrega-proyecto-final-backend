const fs = require("fs")

class ContenedorProductos {
    constructor(path) {
        this.path = path;
    }

    async save(obj) {
        try {
            const leer = await fs.promises.readFile(this.path, 'utf-8')
            const data = JSON.parse(leer)
            const onlyIds = data.map((producto) => producto.id)
            const largestId = Math.max.apply(Math, onlyIds)
            const id = largestId + 1
            const timestamp = Date.now()
            obj = {id: id, timestamp: timestamp, ...obj}
            data.push(obj)
            await fs.promises.writeFile(this.path, JSON.stringify(data))

        } catch (error) {
            console.log('No se pudo escribir el archivo', error)
        }
    }

    async getAll() {
        try {
            const leer = await fs.promises.readFile(this.path, "utf-8")
            const data = JSON.parse(leer)
            return data
        } catch (error) {
            console.log('No se pudo acceder al archivo', error);
        }
    }

    async getById(id) {
        try {
            const leer = await fs.promises.readFile(this.path, 'utf-8')
            const data = JSON.parse(leer)
            const objectWithId = data.find((producto) => producto.id == id)
            if(objectWithId === undefined) {
                console.log("No se encontró el producto con el id indicado");
                const mensaje = "Producto no encontrado"
                return mensaje
            } else {
                return objectWithId
            }
        } catch (error) {
            console.log('No se pudo acceder a los datos', error);
        }
    }

    async deleteById(id) {
        try {
            const leer = await fs.promises.readFile(this.path, 'utf-8')
            const data = JSON.parse(leer)
            const minusOne = data.filter((producto) => producto.id != id)
            await fs.promises.writeFile(this.path, JSON.stringify(minusOne))
        } catch (error) {
            console.log('No se encontró el producto con el id indicado', error);
        }
    }

    async updateProduct(id, datosProducto) {
        id = parseInt(id)
        const leer = await fs.promises.readFile(this.path, 'utf-8')
        const data = JSON.parse(leer)
        const posicionProducto = data.findIndex((producto) => producto.id === id)
        let productoModificado = {id, ...datosProducto}
        console.log(productoModificado);
        data[posicionProducto] = productoModificado
        await fs.promises.writeFile(this.path, JSON.stringify(data))
        
    }
}

module.exports = ContenedorProductos
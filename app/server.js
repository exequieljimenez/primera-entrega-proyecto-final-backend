const express = require("express");
const routerProductos = require("./routes/routeProductos")
const routerCarritos = require("./routes/routeCarritos")


const app = express();

app.use("/api/productos", routerProductos);
app.use("/api/carrito", routerCarritos)

const PORT = process.env.PORT || 8080;

const server = app.listen(PORT, () => {
    console.log(`Escuchando al puerto ${server.address().port}`);
});

server.on("error", (error) => {
    console.log(("Error ", error.message));
})
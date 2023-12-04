require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT;
const cors = require('cors');

app.use(cors())
//middlewares
app.use(express.json());

//rutas
const productosRouter = require('./src/routes/productos.route');
const ventasRouter = require('./src/routes/ventas.route');
const authRouter = require('./src/routes/auth.route');

app.use('/productos', productosRouter);
app.use('/auth', authRouter);
app.use('/ventas', ventasRouter);


app.listen(PORT, () => {
    console.log('API escuchando en el puerto')
});
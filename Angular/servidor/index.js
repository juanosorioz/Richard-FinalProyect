const express = require('express');
const connectDB = require('./config/db')
const cors = require('cors')
const app = express();
const PORT = 4000;

connectDB();

app.use(express.json());
app.use(cors());
app.use('/api/productos',require('./routes/productoRoutes'));
app.use('/api/facturas',require('./routes/facturaRoutes'));
app.use('/api/alquilers',require('./routes/alquilerRoutes'))

/*app.get('/',(req, res) =>{
    res.send("Hello Siahco");
})
*/
app.listen(PORT, ()=> {
    console.log("Server Running")
})
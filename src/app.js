import bodyParser from "body-parser"
import express from "express"
import taskRoutes from "./router/taskRoutes.js";
import "dotenv/config";
import errorHandler from "./middleware/errorHandler.js";
import helmet from "helmet";

const app = express();
const PORT = process.env.PORT || 4000;

app.use(helmet()); // Ayude a proteger las aplicaciones Express configurando encabezados de respuesta HTTP. cuando este desplegados
app.use(bodyParser.json());
app.use('/tasks', taskRoutes);// asignación de rutas
app.use(errorHandler);// controlador de errores y llama a el arcivo que esta en middleware/errorHandleware.js

app.listen(PORT, () => {
      console.log(`Servidor Conectado por el puerto ${PORT} `);
});




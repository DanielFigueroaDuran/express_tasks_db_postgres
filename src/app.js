import bodyParser from "body-parser"
import express from "express"
import taskRoutes from "./router/taskRoutes.js";
import "dotenv/config";
import errorHandler from "./middleware/errorHandler.js";
import helmet from "helmet";
import setupSwaggerDocs from "./docs/swagger.js";


const app = express();
const PORT = process.env.PORT || 4000;

app.use(helmet());
app.use(bodyParser.json());
app.use('/tasks', taskRoutes);
app.use(errorHandler);

app.listen(PORT, () => {
      console.log(`Servidor Conectado por el puerto ${PORT} `);
});




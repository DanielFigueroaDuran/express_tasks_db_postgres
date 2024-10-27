import swaggerJSDoc from "swagger-jsdoc";
// import swaggerUi from "swagger-ui-express";
const swaggerUi = require('swagger-ui-express');

const option = {
      apis: ["./src/routes/*.js"]
};

const swaggerSpec = swaggerJSDoc(option);
const setupSwaggerDocs = (app) => {
      app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}

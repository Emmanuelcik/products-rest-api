import swaggerJSDoc from "swagger-jsdoc";
import { SwaggerUiOptions } from "swagger-ui-express";

const options: swaggerJSDoc.Options = {
  swaggerDefinition: {
    openapi: "3.0.2",
    produces: ["application/json"],
    tags: [
      {
        name: "Products",
        description: "Operations about products",
      },
    ],
    schemes: ["http"],
    title: "REST API Documentation",
    description: "API Documentation for a simple REST server",
    contact: {
      name: "Emmanuel",
      email: "jesusemmcik@gmail.com",
    },
    license: {
      name: "MIT",
      url: "https://opensource.org/licenses/MIT",
    },
    info: {
      title: "REST API Documentation",
      version: "1.0.0",
      description: "API Documentation for a simple REST server",
    },
    servers: [
      {
        url: "http://localhost:4000",
        description: "Development server",
      },
    ],
  },
  apis: ["./src/router.ts"],
};

const swaggerSpect = swaggerJSDoc(options);

const swaggerUiOptions: SwaggerUiOptions = {
  customCss: `.topbar-wrapper .link {
    content: url('https://i.pinimg.com/236x/f0/86/26/f08626df55d399042bb9ee1ac0f11696.jpg');
    height: 120px;
  }`,
  customSiteTitle: "Documentation for express app",
};

export default swaggerSpect;

export { swaggerUiOptions };

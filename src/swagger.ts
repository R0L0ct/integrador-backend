export const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "NUCBA Trabajo Integrador Final",
      version: "1.0.0",
      description: "Api express",
    },
    servers: [
      {
        // url: "http://localhost:3001",
        url: "https://integrador-backend.onrender.com",
      },
    ],
  },
  apis: ["./src/routes/*.ts"],
};

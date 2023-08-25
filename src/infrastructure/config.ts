import "dotenv/config";

const config = {
  server: {
    port: Number(process.env.PORT) || 3001,
  },
  env: process.env.NODE_ENV || "development",
  jwtSecret: process.env.JWT_SECRET,
};

export { config };

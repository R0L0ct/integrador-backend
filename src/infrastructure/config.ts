import "dotenv/config";

const config = {
  server: {
    port: Number(process.env.PORT) || 3001,
  },
  env: process.env.NODE_ENV || "development",
  sendgridApiKey: process.env.SENDGRID_API_KEY,
  brevoApiKey: process.env.BREVO_API_KEY,
};

export { config };

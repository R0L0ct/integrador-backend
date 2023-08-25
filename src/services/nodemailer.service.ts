import nodemailer from "nodemailer";
const trasnporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  auth: {
    user: "madilyn46@ethereal.email",
    pass: "bTvQRkTfzB9EKvNuNp",
  },
});

export { trasnporter };

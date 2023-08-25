import { Request, Response } from "express";
import { trasnporter } from "../services/nodemailer.service";

export const sendMail = async (req: Request, res: Response) => {
  const { from, subject, text, html } = req.body;
  try {
    await trasnporter.sendMail({
      from: from,
      to: "madilyn46@ethereal.email",
      subject: subject,
      text: text,
      html: html,
    });
    res.send({ succes: true });
  } catch (error) {
    console.log(error);
    res.send({ succes: false });
  }
};

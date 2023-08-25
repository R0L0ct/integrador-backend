import { sendMail } from "../controllers/nodemailer.controller";
import { Router } from "express";

const router = Router();

router.post("/", sendMail);

export default router;

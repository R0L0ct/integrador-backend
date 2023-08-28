import { sendMail } from "../controllers/nodemailer.controller";
import { Router } from "express";

const router = Router();

/**
 * @swagger
 * /api/v1/mail:
 *  post:
 *    summary: send email
 *    tags: [Mail]
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              from:
 *                type: string
 *              subject:
 *                type: string
 *              text:
 *                type: string
 *              html:
 *                type: string
 *            required:
 *               - from
 *               - subject
 *               - text
 *               - html
 *    responses:
 *      200:
 *        description: email sended
 */
router.post("/", sendMail);

export default router;

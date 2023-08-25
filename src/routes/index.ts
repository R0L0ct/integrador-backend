import express from "express";

import userRouter from "../routes/user.router";
import authRouter from "../routes/auth.router";
import orderRouter from "../routes/order.router";
import categoryRouter from "../routes/category.router";
import productRouter from "../routes/product.router";
import customerRouter from "../routes/customer.router";
import nodemailerRouter from "../routes/nodemailer.router";

const routerApi = (app: express.Express) => {
  const router = express.Router();
  app.use("/api/v1", router);
  router.use("/user", userRouter);
  router.use("/auth", authRouter);
  router.use("/order", orderRouter);
  router.use("/category", categoryRouter);
  router.use("/product", productRouter);
  router.use("/customer", customerRouter);
  router.use("/mail", nodemailerRouter);
};

export default routerApi;

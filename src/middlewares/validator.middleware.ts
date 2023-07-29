import boom from "@hapi/boom";
import { NextFunction, Request, Response } from "express";
import { ObjectSchema } from "joi";
type RequestProperty = "body" | "params" | "query" | "headers";

function validatorHandler(schema: ObjectSchema, property: RequestProperty) {
  return (req: Request, res: Response, next: NextFunction) => {
    const request = req[property];
    const { error } = schema.validate(request, { abortEarly: false });
    if (error) {
      next(boom.badRequest(error));
    }
    next();
  };
}

export { validatorHandler };

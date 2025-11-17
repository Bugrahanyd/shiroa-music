import { Injectable, NestMiddleware, BadRequestException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as Joi from 'joi';

@Injectable()
export class ValidationMiddleware implements NestMiddleware {
  constructor(private schema: Joi.ObjectSchema) {}

  use(req: Request, res: Response, next: NextFunction) {
    const { error } = this.schema.validate(req.body);
    if (error) {
      throw new BadRequestException(error.details[0].message);
    }
    next();
  }
}

export const createValidationMiddleware = (schema: Joi.ObjectSchema) => {
  return class extends ValidationMiddleware {
    constructor() {
      super(schema);
    }
  };
};
import { Response, Request, NextFunction } from "express";
import { plainToClass, Expose } from "class-transformer";
import { validate } from "class-validator";

export const validationMw = (dtoClass: any) => {
    return function (req: Request, res: Response, next: NextFunction) {
        const output: any = plainToClass(dtoClass, req.body);
        validate(output, { skipMissingProperties: true }).then(errors => {
            // errors is an array of validation errors
            if (errors.length > 0) {
                console.log(errors);
                let errorTexts = Array();
                for (const errorItem of errors) {
                    errorTexts = errorTexts.concat(errorItem.constraints);
                }
                res.status(400).send(errorTexts);
                return;
            } else {
                res.locals.input = output;
                next();
            }
        });
    };
};
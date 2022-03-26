import { validationResult } from "express-validator"

export const validateRequest = (req, res, next) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        const error = new Error('Validation error')
        error.reasons = errors.array()
        throw error;
    }
    next()
}
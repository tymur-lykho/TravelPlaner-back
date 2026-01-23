import { isValidObjectId } from 'mongoose';
import createHttpError from 'http-errors';

export const isValidId = (paramName) => (req, res, next) => {
  const id = req.params[paramName];
  console.log(id);
  if (!isValidObjectId(id)) {
    return next(createHttpError(400, `Invalid ${paramName}`));
  }
  next();
};

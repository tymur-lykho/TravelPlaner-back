import Joi from 'joi';
import mongoose from 'mongoose';
import { geoLatLngSchema } from './point.js';

const objectId = () =>
  Joi.string().custom((value, helpers) => {
    if (!mongoose.Types.ObjectId.isValid(value)) {
      return helpers.error('any.invalid');
    }
    return value;
  }, 'ObjectId validation');

const customStepSchema = Joi.object({
  type: Joi.string().valid('custom').required(),
  order: Joi.number().integer().min(1).required(),
  point: Joi.forbidden(),
  customData: Joi.object({
    name: Joi.string().min(3).max(60),
    description: Joi.string().max(500).allow(''),
    latLng: geoLatLngSchema.required(),
  }).required(),
});

const referenceStepSchema = Joi.object({
  type: Joi.string().valid('reference').required(),
  order: Joi.number().integer().min(1).required(),
  point: objectId().required(),
  customData: Joi.forbidden(),
});

export const createRouteSchema = Joi.object({
  name: Joi.string().min(3).max(60).required(),
  description: Joi.string().allow('').max(500),
  steps: Joi.array()
    .items(referenceStepSchema, customStepSchema)
    .min(1)
    .required(),
  time: Joi.number().min(0),
  length: Joi.number().min(0),
});

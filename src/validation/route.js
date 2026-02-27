import Joi from 'joi';
import { geoLatLngSchema } from './point.js';
import { objectId } from './objectId.js';

const customStepSchema = Joi.object({
  type: Joi.string().valid('custom').required(),
  order: Joi.number().integer().min(1).required(),
  point: Joi.forbidden(),
  customData: Joi.object({
    name: Joi.string().min(3).max(60),
    description: Joi.string().max(500).allow(''),
    lngLat: geoLatLngSchema.required(),
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
    .items(Joi.alternatives().try(referenceStepSchema, customStepSchema))
    .min(1)
    .required(),
  mode: Joi.string().valid('walking', 'driving', 'bicycling'),
});

export const updateRouteSchema = Joi.object({
  name: Joi.string().min(3).max(60),
  description: Joi.string().allow('').max(500),
  steps: Joi.array()
    .items(Joi.alternatives().try(referenceStepSchema, customStepSchema))
    .min(1),
  mode: Joi.string().valid('walking', 'driving', 'bicycling'),
});

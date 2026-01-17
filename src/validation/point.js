import Joi from 'joi';

const photo = Joi.object().keys({
  url: Joi.string().required(),
});

const category = Joi.object().keys({
  name: Joi.string().min(3).max(30).required(),
});

export const geoPointSchema = Joi.object({
  type: Joi.string().valid('Point').required(),
  coordinates: Joi.array()
    .items(Joi.number().min(-180).max(180), Joi.number().min(-90).max(90))
    .length(2)
    .required(),
});

export const geoLatLngSchema = Joi.object().keys({
  lat: Joi.number().min(-90).max(90).required(),
  lng: Joi.number().min(-180).max(180).required(),
});

export const addPointSchema = Joi.object({
  name: Joi.string().min(3).max(60).required(),
  latLng: geoLatLngSchema.required(),
  description: Joi.string().max(500),
  categories: Joi.array().items(category),
});

export const updatePointSchema = Joi.object({
  name: Joi.string().min(3).max(60),
  description: Joi.string().max(500),
  categories: Joi.array().items(category),
});

import Joi from 'joi';

const photo = Joi.object().keys({
  url: Joi.string().required(),
});

const category = Joi.object().keys({
  name: Joi.string().min(3).max(30).required(),
});

export const addPointSchema = Joi.object({
  name: Joi.string().min(3).max(60).required(),
  photos: Joi.array().items(photo),
  latLng: Joi.object()
    .keys({
      lat: Joi.string().required(),
      lng: Joi.string().required(),
    })
    .required(),
  description: Joi.string().max(500),
  categories: Joi.array().items(category),
});

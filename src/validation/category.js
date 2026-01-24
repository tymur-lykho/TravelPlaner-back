import Joi from 'joi';
import { objectId } from './objectId.js';

export const createCategorySchema = Joi.object({
  name: Joi.string().min(3).max(45).required(),
  slug: Joi.string().min(3).max(45).required(),
  parent: objectId(),
  type: Joi.string().valid('point', 'route', 'both').required(),
  icon: Joi.string(),
});

export const updateCategorySchema = Joi.object({
  name: Joi.string().min(3).max(45),
  slug: Joi.string().min(3).max(45),
  parent: objectId(),
  type: Joi.string().valid('point', 'route', 'both'),
  icon: Joi.string(),
});

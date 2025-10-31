import createHttpError from 'http-errors';
import { PointsCollection } from '../db/models/point.js';

export const addPoint = async (payload) => {
  return await PointsCollection.create(payload);
};

export const deletePointById = async (pointId, userId) => {
  const point = await PointsCollection.findById(pointId);

  if (!point) throw createHttpError(404, 'Point not found');

  if (point.owner.toString() !== userId.toString()) {
    throw createHttpError(403, 'You are not the owner of this point');
  }

  return await PointsCollection.deleteOne({ _id: pointId });
};

import createHttpError from 'http-errors';
import { PointsCollection } from '../db/models/point.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';

export const addPoint = async (payload) => {
  const { latLng, ...rest } = payload;

  return await PointsCollection.create({
    ...rest,
    lngLat: {
      type: 'Point',
      coordinates: [Number(latLng.lng), Number(latLng.lat)],
    },
  });
};

export const deletePointById = async (pointId, userId) => {
  const point = await PointsCollection.findById(pointId);

  if (!point) throw createHttpError(404, 'Point not found');

  if (point.owner.toString() !== userId.toString()) {
    throw createHttpError(403, 'You are not the owner of this point');
  }

  return await PointsCollection.deleteOne({ _id: pointId });
};

export const getAllPoints = async (
  minLng,
  minLat,
  maxLng,
  maxLat,
  category,
  search,
  page,
  perPage,
) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const filter = {};

  if (category) {
    filter.category = category;
  }

  if (minLat && minLng && maxLat && maxLng) {
    filter.latLng = {
      $geoWithin: {
        $box: [
          [minLng, minLat],
          [maxLng, maxLat],
        ],
      },
    };
  }

  if (search) {
    filter.name = { $regex: search, $options: 'i' };
  }

  const pointsQuery = await PointsCollection.find(filter).populate(category);

  const pointsCount = await PointsCollection.countDocuments(filter);

  const points = await pointsQuery.skip(skip).limit(limit).exec();

  const paginationData = calculatePaginationData(pointsCount, perPage, page);

  return {
    data: points,
    ...paginationData,
  };
};

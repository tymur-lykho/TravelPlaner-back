import createHttpError from 'http-errors';
import { PointsCollection } from '../db/models/point.js';
import { UsersCollection } from '../db/models/user.js';
import { paginateCollection } from '../utils/paginateCollection.js';

export const addPoint = async (payload) => {
  const { latLng, ...rest } = payload;

  return await PointsCollection.create({
    ...rest,
    lngLat: {
      type: 'Point',
      coordinates: [latLng.lng, latLng.lat],
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

export const getAllPoints = async ({ filters, pagination, userId, saved }) => {
  const { page, perPage } = pagination;

  const { category, coordinates, name, owner } = filters;

  const filter = {};

  if (category) {
    filter.category = category;
  }

  if (
    coordinates &&
    coordinates.swLng &&
    coordinates.swLat &&
    coordinates.neLng &&
    coordinates.neLat
  ) {
    filter.lngLat = {
      $geoWithin: {
        $geometry: {
          type: 'Polygon',
          coordinates: [
            [
              [coordinates.swLng, coordinates.swLat],
              [coordinates.swLng, coordinates.neLat],
              [coordinates.neLng, coordinates.neLat],
              [coordinates.neLng, coordinates.swLat],
              [coordinates.swLng, coordinates.swLat],
            ],
          ],
        },
      },
    };
  }

  if (name) {
    filter.name = { $regex: name, $options: 'i' };
  }

  if (owner) {
    filter.owner = owner;
  }

  if (saved && userId) {
    const user = await UsersCollection.findById(userId).select('savedPoints');
    filter._id = { $in: user.savedPoints };
  }

  const { data, paginationData } = await paginateCollection({
    collection: PointsCollection,
    populateBy: category,
    filter,
    perPage,
    page,
  });

  return {
    points: data,
    ...paginationData,
  };
};

export const updatePoint = async (payload) => {
  const filter = {
    owner: payload.owner,
    _id: payload.pointId,
  };

  const updateData = await PointsCollection.updateOne(filter, payload);

  const pointData = await PointsCollection.find(filter);

  return { pointData, ...updateData };
};

export const addPointToFavorite = async (userId, pointId) => {
  const point = await PointsCollection.findById(pointId);

  if (!point) throw createHttpError(404, 'Point is not defined');

  return await UsersCollection.findByIdAndUpdate(userId, {
    $addToSet: { savedPoints: pointId },
  });
};

export const deletePointFromFavoriteById = async (pointId, userId) => {
  await UsersCollection.findByIdAndUpdate(userId, {
    $pull: { savedPoints: pointId },
  });
};

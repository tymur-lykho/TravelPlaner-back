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
  coordinates,
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

  //!! if (
  //   coordinates &&
  //   coordinates.swLng &&
  //   coordinates.swLat &&
  //   coordinates.neLng &&
  //   coordinates.neLat
  // ) {
  //   filter.latLng = {
  //     $geoWithin: {
  //       $geometry: {
  //         type: 'Polygon',
  //         coordinates: [
  //           [
  //             [coordinates.swLng, coordinates.swLat],
  //             [coordinates.swLng, coordinates.neLat],
  //             [coordinates.neLng, coordinates.neLat],
  //             [coordinates.neLng, coordinates.swLat],
  //             [coordinates.swLng, coordinates.swLat],
  //           ],
  //         ],
  //       },
  //     },
  //   };
  // }

  if (search) {
    filter.name = { $regex: search, $options: 'i' };
  }

  console.log(filter);

  const pointsQuery = PointsCollection.find(filter); //.populate(category);

  const pointsCount = await PointsCollection.countDocuments(filter);

  const points = await pointsQuery.skip(skip).limit(limit).exec();

  const paginationData = calculatePaginationData(pointsCount, perPage, page);

  return {
    data: points,
    ...paginationData,
  };
};

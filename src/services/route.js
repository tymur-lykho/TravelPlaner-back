import { PointsCollection } from '../db/models/point.js';
import { RoutesCollection } from '../db/models/route.js';
import {
  calculateRoute,
  stepsForAPI,
} from '../utils/getDirectionsByGoogleAPI.js';
import { validSteps } from '../utils/validSteps.js';

export const addRoute = async (payload) => {
  const { steps, mode, ...rest } = payload;

  const { polyline, distance, duration } = await calculateRoute(
    await stepsForAPI(steps),
  );

  return await RoutesCollection.create({
    ...rest,
    steps: validSteps(payload.steps),
    length: distance,
    time: duration,
    polyline,
    mode,
  });
};

export const updateRoute = async (payload) => {
  const filter = {
    owner: payload.owner,
    _id: payload.routeId,
  };

  const { steps, mode, ...rest } = payload;

  const updateData = {
    ...rest,
  };

  const oldRouteData = await RoutesCollection.findOne({ _id: filter._id });

  if (mode) {
    const { polyline, distance, duration } = await calculateRoute(
      await stepsForAPI(oldRouteData.steps),
      mode,
    );
    updateData.length = distance;
    updateData.time = duration;
    updateData.polyline = polyline;
    updateData.mode = mode;
  }

  if (steps) {
    const { polyline, distance, duration } = await calculateRoute(
      await stepsForAPI(steps),
      oldRouteData.mode,
    );
    updateData.steps = validSteps(steps);
    updateData.length = distance;
    updateData.time = duration;
    updateData.polyline = polyline;
  }

  console.log('updateData: ', updateData);

  const resultData = await RoutesCollection.updateOne(filter, {
    $set: updateData,
  });

  const routeData = await RoutesCollection.find(filter);

  return { routeData, ...resultData };
};

export const getAllRoutes = async ({ filters, pagination }) => {
  console.log('ALL ROUTES');
  const { page, perPage } = pagination;
  const { category, coordinates, name, owner } = filters;

  const conditions = [];

  const filter = { $or: conditions };

  const baseFilter = {};

  if (category) {
    baseFilter.category = category;
  }

  if (name) {
    baseFilter.name = { $regex: name, $options: 'i' };
  }

  if (owner) {
    baseFilter.owner = owner;
  }

  if (
    coordinates &&
    coordinates.swLng &&
    coordinates.swLat &&
    coordinates.neLng &&
    coordinates.neLat
  ) {
    const lngLat = {
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

    const pointsInViewPort = await PointsCollection.find({
      lngLat,
    }).select('_id');

    const pointIdsInViewPort = pointsInViewPort.map((p) => p._id);

    if (!pointIdsInViewPort.length) return [];
    // throw createHttpError(404, 'Routes in viewport not found');

    conditions.push({
      steps: { $elemMatch: { point: { $in: pointIdsInViewPort } } },
      ...baseFilter,
    });

    //!! conditions.push({
    //   steps: { 'customData.lngLat': lngLat },
    //   ...baseFilter,
    // });
  }

  console.log(filter);

  const routes = await RoutesCollection.find(filter);

  return routes;
};

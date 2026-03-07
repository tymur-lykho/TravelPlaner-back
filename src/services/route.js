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

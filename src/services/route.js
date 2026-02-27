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

  console.log(filter);

  const { steps, mode, ...rest } = payload;

  const updateData = {
    ...rest,
  };

  const oldRouteData = await RoutesCollection.findOne({ _id: filter._id });

  console.log('Steps Old', oldRouteData.steps);

  if (mode) {
    const { polyline, distance, duration } = await calculateRoute(
      await stepsForAPI(oldRouteData.steps),
      mode,
    );
    updateData = {
      ...updateData,
      length: distance,
      time: duration,
      polyline,
      mode,
    };
  }

  if (steps) {
    const { polyline, distance, duration } = await calculateRoute(
      await stepsForAPI(steps),
      oldRouteData.mode,
    );
    updateData = {
      ...updateData,
      steps: validSteps(steps),
      length: distance,
      time: duration,
      polyline,
    };
  }

  console.log(updateData);

  const resultData = await RoutesCollection.updateOne(filter, {
    $set: updateData,
  });

  const routeData = await RoutesCollection.find(filter);

  return { routeData, ...resultData };
};

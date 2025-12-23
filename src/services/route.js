import { PointsCollection } from '../db/models/point.js';
import { RoutesCollection } from '../db/models/route.js';
import { calculateRoute } from '../utils/getDirectionsByGoogleAPI.js';

export const addRoute = async (payload) => {
  const { steps, ...rest } = payload;

  console.log(steps);

  const stepsForAPI = async (steps) =>
    Promise.all(
      steps.map(async (step) => {
        if (step.type !== 'reference') {
          return step.customData.latLng;
        }

        const pointData = await PointsCollection.findById(step.point);

        const pointLngLat = {
          lng: pointData.lngLat.coordinates[0],
          lat: pointData.lngLat.coordinates[1],
        };

        return pointLngLat;
      }),
    );

  const { polyline, distance, duration } = await calculateRoute(
    await stepsForAPI(steps),
  );

  const validSteps = payload.steps.map((step) => {
    if (step.type !== 'custom') return step;

    const { customData, ...restStepData } = step;
    const { latLng, ...restCustomData } = customData;

    return {
      ...restStepData,
      customData: {
        ...restCustomData,
        lngLat: {
          type: 'Point',
          coordinates: [latLng.lng, latLng.lat],
        },
      },
    };
  });

  return await RoutesCollection.create({
    ...rest,
    steps: validSteps,
    length: distance,
    time: duration,
    polyline,
  });
};

export const updateRoute = async (payload) => {
  const filter = {
    owner: payload.owner,
    _id: payload.routeId,
  };

  const updateData = await RoutesCollection.updateOne(filter, {
    $set: payload.data,
  });
  const routeData = await RoutesCollection.find(filter);

  return { routeData, ...updateData };
};

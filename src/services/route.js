import createHttpError from 'http-errors';
import { RoutesCollection } from '../db/models/route.js';

export const addRoute = async (payload) => {
  console.log(payload.steps);
  const { steps, ...rest } = payload;

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

import createHttpError from 'http-errors';
import { RoutesCollection } from '../db/models/route.js';

export const addRoute = async (payload) => {
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

  console.log(validSteps);

  return await RoutesCollection.create({
    ...rest,
    steps: validSteps,
  });
};

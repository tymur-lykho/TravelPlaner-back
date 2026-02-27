export const validSteps = (steps) => {
  return steps.map((step) => {
    if (step.type !== 'custom') return step;

    const { customData, ...restStepData } = step;
    const { lngLat, ...restCustomData } = customData;

    return {
      ...restStepData,
      customData: {
        ...restCustomData,
        lngLat: {
          type: 'Point',
          coordinates: [lngLat.lng, lngLat.lat],
        },
      },
    };
  });
};

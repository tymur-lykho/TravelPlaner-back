import axios from 'axios';
import { getEnvVar } from './getEnvVar.js';

const API_KEY = getEnvVar('GOOGLE_MAPS_API_KEY');

export const calculateRoute = async (points, mode) => {
  if (points.length < 2) {
    throw new Error('Route must contain at least 2 points');
  }

  const origin = `${points[0].lat},${points[0].lng}`;
  const destination = `${points.at(-1).lat},${points.at(-1).lng}`;

  const waypoints =
    points.length > 2
      ? points
          .slice(1, -1)
          .map((p) => `${p.lat},${p.lng}`)
          .join('|')
      : undefined;

  const response = await axios.get(
    'https://maps.googleapis.com/maps/api/directions/json',
    {
      params: {
        origin,
        destination,
        waypoints,
        key: API_KEY,
        mode,
      },
    },
  );

  const route = response.data.routes[0];
  if (!route) {
    throw new Error('Route not found');
  }

  const totalDistance = route.legs.reduce(
    (sum, leg) => sum + leg.distance.value,
    0,
  );

  const totalDuration = route.legs.reduce(
    (sum, leg) => sum + leg.duration.value,
    0,
  );

  return {
    polyline: route.overview_polyline.points,
    distance: totalDistance,
    duration: totalDuration,
  };
};

export const stepsForAPI = async (steps) => {
  const pointIds = steps
    .filter((s) => s.type === 'reference')
    .map((s) => s.point);

  const pointsData = await PointsCollection.find({
    _id: {
      $in: pointIds,
    },
  });

  const pointCoordinates = pointsData.map((p) => {
    return {
      lng: p.lngLat.coordinates[0],
      lat: p.lngLat.coordinates[1],
    };
  });

  let referenceCount = 0;
  const resultSteps = [];

  for (const step of steps) {
    if (step.type === 'reference') {
      resultSteps.push(pointCoordinates[referenceCount]);
    } else {
      resultSteps.push(step.customData.latLng);
    }
  }

  return resultSteps;
};

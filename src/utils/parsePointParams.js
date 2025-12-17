import mongoose from 'mongoose';
import createHttpError from 'http-errors';

function parseObjectId(val) {
  if (!val) return undefined;

  if (!mongoose.Types.ObjectId.isValid(val)) return undefined;

  return val;
}

function parseString(str) {
  if (!str || typeof str !== 'string') return undefined;

  const trimmedStr = str.trim();

  if (trimmedStr === '') return undefined;

  return str;
}

function parseSearchArea(swLat, swLng, neLat, neLng) {
  if ([swLng, swLat, neLng, neLat].some((v) => v === undefined)) {
    return undefined;
  }

  const coords = {
    swLat: parseFloat(swLat),
    swLng: parseFloat(swLng),
    neLat: parseFloat(neLat),
    neLng: parseFloat(neLng),
  };

  console.log(coords);

  if (Object.values(coords).some((v) => v === Number.isNaN(v))) {
    throw createHttpError(400, 'All coordinates must be valid numbers');
  }

  if (
    coords.swLng < -180 ||
    coords.swLng > 180 ||
    coords.neLng < -180 ||
    coords.neLng > 180 ||
    coords.swLat < -90 ||
    coords.swLat > 90 ||
    coords.neLat < -90 ||
    coords.neLat > 90
  ) {
    throw createHttpError(400, 'Coordinates must be within valid Earth ranges');
  }

  if (coords.swLat >= coords.neLat || coords.swLng >= coords.neLng) {
    throw createHttpError(
      400,
      'Invalid bounding box: southwest must be less than northeast',
    );
  }

  return coords;
}

export const parsePointParams = (query) => {
  return {
    category: parseObjectId(query.category),
    name: parseString(query.name),
    coordinates: parseSearchArea(
      query.swLat,
      query.swLng,
      query.neLat,
      query.neLng,
    ),
    userId: parseObjectId(query.userId),
    owner: parseObjectId(query.owner),
  };
};

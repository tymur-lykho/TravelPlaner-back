import { parseObjectId } from './parseObjectId.js';
import { parseSearchArea } from './parseSearchArea.js';
import { parseString } from './parseString.js';

export const parseRouteParams = (query) => {
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

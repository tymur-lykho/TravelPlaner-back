import { parseObjectId } from './parseObjectId.js';
import { parseString } from './parseString.js';

export const parsePhotoParams = (query) => {
  const { target, targetType } = query;

  return { target: parseObjectId(target), targetType: parseString(targetType) };
};

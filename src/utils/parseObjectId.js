import mongoose from 'mongoose';

export const parseObjectId = (val) => {
  if (!val) return undefined;

  if (!mongoose.Types.ObjectId.isValid(val)) return undefined;

  return val;
};

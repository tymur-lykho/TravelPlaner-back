import createHttpError from 'http-errors';

export const addPointToFavorite = async (user, pointId) => {
  const pointIsFavorite = user.savedPoints.some(
    (point) => point._id.toString() === pointId.toString(),
  );

  if (!pointIsFavorite) {
    user.savedPoints.push(pointId);
    await user.save();
  }

  return user.savedPoints;
};

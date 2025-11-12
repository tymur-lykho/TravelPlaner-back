import { addPointToFavorite } from '../services/favoritePoint.js';

export const addPointToFavoriteController = async (req, res) => {
  const user = req.user;
  const pointId = req.params.id;

  const points = await addPointToFavorite(user, pointId);

  res.status(201).json({
    status: 201,
    message: 'Point added to favorite',
    data: points,
  });
};

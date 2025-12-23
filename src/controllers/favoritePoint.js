import {
  addPointToFavorite,
  deletePointFromFavoriteById,
  getAllPoints,
} from '../services/point.js';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parsePointParams } from '../utils/parsePointParams.js';

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

export const getUserFavoritePointsController = async (req, res) => {
  const { page, perPage } = parsePaginationParams(req.query);
  const { category, name, coordinates, owner } = parsePointParams(req.query);
  const saved = true;
  const userId = req.user._id;

  const points = await getAllPoints({
    coordinates,
    category,
    name,
    page,
    perPage,
    saved,
    owner,
    userId,
  });

  res.status(200).json({
    status: 200,
    message: 'Saved points retrieved successfully',
    data: points,
  });
};

export const deletePointFromFavoriteController = async (req, res) => {
  await deletePointFromFavoriteById(req.params.id, req.user._id);

  res.status(204).json({
    status: 204,
    message: 'Favorite point has been deleted',
  });
};

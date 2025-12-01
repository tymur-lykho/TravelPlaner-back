import {
  addPoint,
  deletePointById,
  getAllPoints,
  updatePoint,
} from '../services/point.js';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parsePointParams } from '../utils/parsePointParams.js';

export const addPointController = async (req, res) => {
  const point = await addPoint({ ...req.body, owner: req.user._id });

  res.status(201).json({
    status: 201,
    message: 'Point created',
    data: point,
  });
};

export const deletePointByIdController = async (req, res) => {
  await deletePointById(req.params.id, req.user._id);

  res.status(204).json({
    status: 204,
    message: 'Point has been deleted',
  });
};

export const getAllPointsController = async (req, res) => {
  const { page, perPage } = parsePaginationParams(req.query);
  const { category, name, coordinates, owner } = parsePointParams(req.query);

  const points = await getAllPoints({
    coordinates,
    category,
    name,
    page,
    perPage,
    owner,
  });

  res.status(200).json({
    status: 200,
    message: 'Points retrieved successfully',
    data: points,
  });
};

export const getUserPointsController = async (req, res) => {
  const { page, perPage } = parsePaginationParams(req.query);
  const { category, name, coordinates } = parsePointParams(req.query);
  const userId = req.user._id;

  const points = await getAllPoints(
    coordinates,
    category,
    name,
    page,
    perPage,
    userId,
  );

  res.status(200).json({
    status: 200,
    message: 'Points retrieved successfully',
    data: points,
  });
};

export const updatePointController = async (req, res) => {
  const point = await updatePoint({
    ...req.body,
    owner: req.user._id,
    pointId: req.params.id,
  });

  res.status(201).json({
    status: 201,
    message: 'Point updated',
    data: point,
  });
};

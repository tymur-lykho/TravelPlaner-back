import { addPoint, deletePointById } from '../services/point.js';

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
};

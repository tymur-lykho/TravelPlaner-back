import { addRoute } from '../services/route.js';

export const addRouteController = async (req, res) => {
  const point = await addRoute({ ...req.body, owner: req.user._id });

  res.status(201).json({
    status: 201,
    message: 'Route created',
    data: point,
  });
};

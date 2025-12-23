import { addRoute, updateRoute } from '../services/route.js';

export const addRouteController = async (req, res) => {
  const route = await addRoute({ ...req.body, owner: req.user._id });

  res.status(201).json({
    status: 201,
    message: 'Route created',
    data: route,
  });
};

export const updateRouteController = async (req, res) => {
  const route = await updateRoute({
    ...req.body,
    routeId: req.params._id,
    owner: req.user.id,
  });

  res.status(201).json({
    status: 201,
    message: 'Route updated',
    data: route,
  });
};

import { addRoute, getAllRoutes, updateRoute } from '../services/route.js';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseRouteParams } from '../utils/parseRouteParams.js';

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
    routeId: req.params.id,
    owner: req.user._id,
  });

  res.status(201).json({
    status: 201,
    message: 'Route updated',
    data: route,
  });
};

export const getAllRoutesController = async (req, res) => {
  console.log('ALL ROUTES CTRL');

  const pagination = parsePaginationParams(req.query);
  const filters = parseRouteParams(req.query);

  const routes = await getAllRoutes({ pagination, filters });

  res.status(200).json({
    status: 200,
    message: 'Routes retrieved successfully',
    data: routes,
  });
};

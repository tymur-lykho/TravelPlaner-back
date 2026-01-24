import { parsePaginationParams } from '../utils/parsePaginationParams';

export const getUsersController = async (req, res) => {
  // const { name } = parseUserParams(req.query);
  const { page, perPage } = parsePaginationParams(req.query);

  const users = await getUsers(page, perPage);

  res.status(200).json({
    status: 200,
    message: 'Users retrived successfully',
    data: users,
  });
};

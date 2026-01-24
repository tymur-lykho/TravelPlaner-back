import { uploadPhotos } from '../services/photo.js';
import {
  getUserById,
  getUsers,
  updateUser,
  updateUserAvatar,
} from '../services/user.js';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';

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

export const getUserByIdController = async (req, res) => {
  const user = await getUserById(req.params.id);

  res.status(200).json({
    status: 200,
    message: 'User content loaded',
    data: user,
  });
};

export const getMyUserController = async (req, res) => {
  const data = await getUserById(req.user._id);

  res.status(200).json({
    status: 200,
    message: 'User data loaded',
    data,
  });
};

export const updateUserController = async (req, res) => {
  const userId = req.user._id;

  const user = await updateUser({ userId, ...req.body });

  res.status(201).json({
    status: 201,
    message: 'User updated',
    data: user,
  });
};

export const updateUserAvatarController = async (req, res) => {
  const userId = req.user._id;
  const photo = req.file;

  const result = await updateUserAvatar(userId, photo);

  res.status(200).json({
    status: 200,
    message: 'User avatar is uploaded',
    data: result,
  });
};

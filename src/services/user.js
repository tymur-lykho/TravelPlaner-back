import mongoose from 'mongoose';
import { UsersCollection } from '../db/models/user.js';
import { paginateCollection } from '../utils/paginateCollection.js';
import { uploadPhotos } from './photo.js';

export const getUsers = async (page, perPage) => {
  const { data, paginationData } = await paginateCollection({
    collection: UsersCollection,
    page,
    perPage,
  });

  return {
    users: data,
    ...paginationData,
  };
};

export const getUserById = async (userId) => {
  return await UsersCollection.findById(userId);
};

export const updateUser = async (payload) => {
  const updateData = await UsersCollection.updateOne(
    { _id: payload.userId },
    payload,
  );

  const userData = await UsersCollection.findById(payload.userId);

  return { userData, ...updateData };
};

export const updateUserAvatar = async (userId, photo) => {
  const result = await uploadPhotos({
    files: photo,
    target: userId,
    owner: userId,
    targetType: 'user',
  });

  await UsersCollection.updateOne(
    { _id: userId },
    { $set: { avatar: result._id } },
  );

  return {
    avatarUrl: result.url,
  };
};

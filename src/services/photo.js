import { saveFileToUploadDir } from '../utils/saveFileToUploadDir.js';
import { PhotosCollection } from '../db/models/photo.js';
import { paginateCollection } from '../utils/paginateCollection.js';

export const uploadPhotos = async ({ files, target, targetType, owner }) => {
  const photos = await Promise.all(
    files.map(async (file) => ({
      url: await saveFileToUploadDir(file),
      target,
      owner,
      targetType,
    })),
  );

  return await PhotosCollection.create(photos);
};

export const deletePhotoById = async (photoId, userId) => {
  const photo = await PhotosCollection.findById(photoId);

  if (!photo) throw createHttpError(404, 'Photo not found');

  if (photo.owner.toString() !== userId.toString()) {
    throw createHttpError(403, 'You are not the owner of this photo');
  }

  return await PhotosCollection.deleteOne({ _id: photoId });
};

export const deletePhotosByTarget = async (targetId, ownerId) => {
  const photos = await PhotosCollection.find({
    target: targetId,
    owner: ownerId,
  });

  if (!photos.length) throw createHttpError(404, 'Photos not found');

  return await PhotosCollection.deleteMany({
    target: targetId,
    owner: ownerId,
  });
};

export const getPhotos = async (target, page, perPage) => {
  const filter = { target: target };

  const { data, paginationData } = await paginateCollection({
    collection: PhotosCollection,
    filter,
    page,
    perPage,
  });

  return {
    photos: data,
    ...paginationData,
  };
};

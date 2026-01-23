import { saveFileToUploadDir } from '../utils/saveFileToUploadDir.js';
import { PhotosCollection } from '../db/models/photo.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';

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
  const limit = perPage;
  const skip = (page - 1) * perPage;
  const filter = { target: target };

  const photosQuery = PhotosCollection.find(filter);

  const photosCount = await PhotosCollection.countDocuments(filter);

  const photos = await photosQuery.skip(skip).limit(limit).exec();

  const paginationData = calculatePaginationData(photosCount, perPage, page);

  return {
    photos: photos,
    ...paginationData,
  };
};

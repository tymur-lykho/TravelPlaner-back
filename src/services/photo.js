import { saveFileToUploadDir } from '../utils/saveFileToUploadDir.js';
import { PhotosCollection } from '../db/models/photo.js';

export const uploadPhotos = async ({ files, targetId, targetType, owner }) => {
  const photos = await Promise.all(
    files.map(async (file) => ({
      url: await saveFileToUploadDir(file),
      target: targetId,
      owner,
      targetType,
    })),
  );

  return await PhotosCollection.create(photos);
};

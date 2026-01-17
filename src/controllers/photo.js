import { uploadPhotos } from '../services/photo.js';

export const addPhotosController = async (req, res) => {
  const photos = req.files;

  const owner = req.user._id;
  const targetId = req.params.id;
  const targetType = req.baseUrl.slice(1, -1);

  const result = await uploadPhotos({
    files: photos,
    targetId,
    targetType,
    owner,
  });

  res.status(200).json({
    status: 200,
    message: 'Photos is uploaded',
    data: result,
  });
};

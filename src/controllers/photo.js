import {
  deletePhotoById,
  deletePhotosByTarget,
  getPhotos,
  uploadPhotos,
} from '../services/photo.js';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';

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

export const getPhotosController = async (req, res) => {
  const targetId = req.params.id;
  const { page, perPage } = parsePaginationParams(req.query);

  const photos = await getPhotos(targetId, page, perPage);

  res.status(200).json({
    status: 200,
    message: 'Photos retrieved successfully',
    data: photos,
  });
};

export const deletePhotoByIdController = async (req, res) => {
  await deletePhotoById(req.params.id, req.user._id);

  res.status(204).json({
    status: 204,
    message: 'Photo has been deleted',
  });
};

export const deletePhotosByTargetController = async (req, res) => {
  await deletePhotosByTarget(req.params.id, req.user._id);

  res.status(204).json({
    status: 204,
    message: 'Photo has been deleted',
  });
};

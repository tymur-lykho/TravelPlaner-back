import {
  deletePhotoById,
  deletePhotosByTarget,
  getPhotos,
  uploadPhotos,
} from '../services/photo.js';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parsePhotoParams } from '../utils/parsePhotoParams.js';

export const addPhotosController = async (req, res) => {
  const photos = req.files;

  const owner = req.user._id;

  const { target, targetType } = parsePhotoParams(req.query);

  const result = await uploadPhotos({
    files: photos,
    target,
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
  const { target } = parsePhotoParams(req.query);
  const { page, perPage } = parsePaginationParams(req.query);

  const photos = await getPhotos(target, page, perPage);

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
  const { target } = parsePhotoParams(req.query);
  await deletePhotosByTarget(target, req.user._id);

  res.status(204).json({
    status: 204,
    message: 'Photo has been deleted',
  });
};

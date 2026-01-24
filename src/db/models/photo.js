import { model, Schema } from 'mongoose';

export const photoSchema = new Schema(
  {
    url: {
      type: String,
      required: true,
    },
    publicId: {
      type: String,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    target: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    targetType: {
      type: String,
      enum: ['point', 'route', 'user'],
      required: true,
    },
  },
  { timestamps: true, versionKey: false },
);

export const PhotosCollection = model('Photo', photoSchema);

import { model, Schema } from 'mongoose';

export const routeSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Comment',
      },
    ],
    points: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Point',
      },
    ],
    time: {
      type: Number,
    },
  },
  { timestamps: true, versionKey: false },
);

export const RoutesCollection = model('Route', routeSchema);

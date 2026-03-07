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
    categories: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Category',
      },
    ],
    steps: [
      {
        type: {
          type: String,
          enum: ['reference', 'custom'],
          required: true,
        },

        order: {
          type: Number,
          required: true,
        },

        point: {
          type: Schema.Types.ObjectId,
          ref: 'Point',
          required: function () {
            return this.type === 'reference';
          },
        },

        customData: {
          type: {
            name: String,
            description: String,
            lngLat: {
              type: { type: String, enum: ['Point'], required: true },
              coordinates: { type: [Number], required: true },
            },
          },
          required: function () {
            return this.type === 'custom';
          },
        },
      },
    ],
    time: {
      type: Number,
    },
    length: {
      type: Number,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    polyline: {
      type: String,
      required: true,
    },
    mode: {
      type: String,
      enum: ['bicycling', 'walking', 'driving'],
    },
  },
  { timestamps: true, versionKey: false },
);

routeSchema.index({ lngLat: '2dsphere' });
routeSchema.index({ categories: 1 });

export const RoutesCollection = model('Route', routeSchema);

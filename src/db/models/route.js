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
              type: { type: String, enum: ['Point'] },
              coordinates: { type: [Number] },
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
  },
  { timestamps: true, versionKey: false },
);

routeSchema.index({ lngLat: '2dsphere' });

export const RoutesCollection = model('Route', routeSchema);

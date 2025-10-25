import { model, Schema } from 'mongoose';

export const commentSchema = new Schema(
  {
    autor: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    text: {
      type: String,
      required: true,
    },
  },
  { timestamps: true, versionKey: false },
);

export const CommentsCollection = model('Comment', commentSchema);

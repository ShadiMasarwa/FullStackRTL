import mongoose, { Schema, Document } from 'mongoose';

export interface IComment extends Document {
  lessonSlug: string;
  userId: mongoose.Types.ObjectId;
  userDisplayName: string;
  content: string;
  isMentorResponse: boolean;
  parentCommentId: mongoose.Types.ObjectId | null;
  createdAt: Date;
  updatedAt: Date;
}

const CommentSchema = new Schema<IComment>(
  {
    lessonSlug: {
      type: String,
      required: true,
      index: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    userDisplayName: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 1000,
    },
    isMentorResponse: {
      type: Boolean,
      default: false,
    },
    parentCommentId: {
      type: Schema.Types.ObjectId,
      ref: 'Comment',
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

CommentSchema.index({ lessonSlug: 1, createdAt: 1 });
CommentSchema.index({ lessonSlug: 1, parentCommentId: 1, createdAt: 1 });

export const Comment = mongoose.model<IComment>('Comment', CommentSchema);

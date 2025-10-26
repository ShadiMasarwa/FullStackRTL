import mongoose, { Schema, Document } from 'mongoose';

export interface IAnswer {
  questionIndex: number;
  chosenIndex: number;
  isCorrect: boolean;
}

export interface IProgress extends Document {
  userId: mongoose.Types.ObjectId;
  courseSlug: string;
  lessonSlug: string;
  status: 'locked' | 'in-progress' | 'done';
  score: number;
  answers: IAnswer[];
  updatedAt: Date;
}

const AnswerSchema = new Schema<IAnswer>({
  questionIndex: Number,
  chosenIndex: Number,
  isCorrect: Boolean,
}, { _id: false });

const ProgressSchema = new Schema<IProgress>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  courseSlug: {
    type: String,
    required: true,
  },
  lessonSlug: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['locked', 'in-progress', 'done'],
    default: 'locked',
  },
  score: {
    type: Number,
    default: 0,
  },
  answers: {
    type: [AnswerSchema],
    default: [],
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

ProgressSchema.index({ userId: 1, courseSlug: 1, lessonSlug: 1 }, { unique: true });

export default mongoose.model<IProgress>('Progress', ProgressSchema);

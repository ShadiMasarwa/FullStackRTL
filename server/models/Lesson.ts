import mongoose, { Schema, Document } from 'mongoose';

export interface IExample {
  titleHE: string;
  code: string;
  expectedOutput: string;
}

export interface ILesson extends Document {
  courseSlug: string;
  slug: string;
  titleHE: string;
  order: number;
  contentHE: string;
  examples: IExample[];
  requiresScore: number;
}

const ExampleSchema = new Schema<IExample>({
  titleHE: String,
  code: String,
  expectedOutput: String,
}, { _id: false });

const LessonSchema = new Schema<ILesson>({
  courseSlug: {
    type: String,
    required: true,
    index: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  titleHE: {
    type: String,
    required: true,
  },
  order: {
    type: Number,
    required: true,
  },
  contentHE: {
    type: String,
    required: true,
  },
  examples: {
    type: [ExampleSchema],
    default: [],
  },
  requiresScore: {
    type: Number,
    default: 100,
  },
});

LessonSchema.index({ courseSlug: 1, order: 1 });

export default mongoose.model<ILesson>('Lesson', LessonSchema);

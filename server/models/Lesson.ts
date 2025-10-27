import mongoose, { Schema, Document } from 'mongoose';

export interface ICodeExample {
  titleHE: string;
  code: string;
  output: string;
  explanationHE: string;
}

export interface ILessonPage {
  titleHE: string;
  contentHE: string;
  codeExamples?: ICodeExample[];
}

export interface ILesson extends Document {
  courseSlug: string;
  slug: string;
  titleHE: string;
  order: number;
  pages: ILessonPage[];
  requiresScore: number;
}

const CodeExampleSchema = new Schema<ICodeExample>({
  titleHE: String,
  code: String,
  output: String,
  explanationHE: String,
}, { _id: false });

const LessonPageSchema = new Schema<ILessonPage>({
  titleHE: String,
  contentHE: String,
  codeExamples: {
    type: [CodeExampleSchema],
    default: [],
  },
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
  pages: {
    type: [LessonPageSchema],
    required: true,
  },
  requiresScore: {
    type: Number,
    default: 100,
  },
});

LessonSchema.index({ courseSlug: 1, order: 1 });

export default mongoose.model<ILesson>('Lesson', LessonSchema);

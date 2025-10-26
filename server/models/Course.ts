import mongoose, { Schema, Document } from 'mongoose';

export interface ICourse extends Document {
  slug: string;
  titleHE: string;
  descriptionHE: string;
  order: number;
  topics: string[];
  levelRange: string;
  coverIcon: string;
}

const CourseSchema = new Schema<ICourse>({
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  titleHE: {
    type: String,
    required: true,
  },
  descriptionHE: {
    type: String,
    required: true,
  },
  order: {
    type: Number,
    required: true,
  },
  topics: {
    type: [String],
    default: [],
  },
  levelRange: {
    type: String,
    default: 'מתחיל–בינוני+',
  },
  coverIcon: {
    type: String,
    default: '',
  },
});

export default mongoose.model<ICourse>('Course', CourseSchema);

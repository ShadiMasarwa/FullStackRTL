import mongoose, { Schema, Document } from 'mongoose';

export interface IQuestion {
  promptHE: string;
  choicesHE: string[];
  correctIndex: number;
}

export interface IQuiz extends Document {
  lessonId: mongoose.Types.ObjectId;
  questions: IQuestion[];
}

const QuestionSchema = new Schema<IQuestion>({
  promptHE: String,
  choicesHE: [String],
  correctIndex: Number,
}, { _id: false });

const QuizSchema = new Schema<IQuiz>({
  lessonId: {
    type: Schema.Types.ObjectId,
    ref: 'Lesson',
    required: true,
    unique: true,
  },
  questions: {
    type: [QuestionSchema],
    default: [],
  },
});

export default mongoose.model<IQuiz>('Quiz', QuizSchema);

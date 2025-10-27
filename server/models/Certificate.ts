import mongoose, { Schema, Document } from 'mongoose';

export interface ICertificate extends Document {
  userId: mongoose.Types.ObjectId;
  courseSlug: string;
  courseTitleHE: string;
  userDisplayName: string;
  completedAt: Date;
  certificateNumber: string;
}

const CertificateSchema = new Schema<ICertificate>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    courseSlug: {
      type: String,
      required: true,
      index: true,
    },
    courseTitleHE: {
      type: String,
      required: true,
    },
    userDisplayName: {
      type: String,
      required: true,
    },
    completedAt: {
      type: Date,
      default: Date.now,
    },
    certificateNumber: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

CertificateSchema.index({ userId: 1, courseSlug: 1 }, { unique: true });

export const Certificate = mongoose.model<ICertificate>('Certificate', CertificateSchema);

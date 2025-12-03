import mongoose, { Schema, Document } from 'mongoose';

export interface IContact extends Document {
  name: string;
  email: string;
  mobile: string;
  companyName?: string;
  subject?: string;
  message?: string;
  productName?: string;
  productSlug?: string;
  productId?: mongoose.Types.ObjectId;
  enquiryType: 'general' | 'product';
  status: 'new' | 'read' | 'responded' | 'closed';
  createdAt: Date;
  updatedAt: Date;
}

const ContactSchema = new Schema<IContact>(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
    },
    mobile: {
      type: String,
      required: [true, 'Mobile number is required'],
      trim: true,
    },
    companyName: {
      type: String,
      trim: true,
    },
    subject: {
      type: String,
      trim: true,
    },
    message: {
      type: String,
      trim: true,
    },
    productName: {
      type: String,
      trim: true,
    },
    productSlug: {
      type: String,
      trim: true,
    },
    productId: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
    },
    enquiryType: {
      type: String,
      enum: ['general', 'product'],
      default: 'general',
    },
    status: {
      type: String,
      enum: ['new', 'read', 'responded', 'closed'],
      default: 'new',
    },
  },
  {
    timestamps: true,
  }
);

// Create indexes for efficient queries
ContactSchema.index({ status: 1, createdAt: -1 });
ContactSchema.index({ email: 1 });
ContactSchema.index({ productId: 1 });
ContactSchema.index({ enquiryType: 1 });

const Contact = mongoose.models.Contact || mongoose.model<IContact>('Contact', ContactSchema);

export default Contact;

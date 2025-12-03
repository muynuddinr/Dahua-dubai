import mongoose, { Schema, Document } from 'mongoose';

export interface ISubCategory extends Document {
  name: string;
  slug: string;
  description?: string;
  image?: string;
  imagePublicId?: string;
  categoryId: mongoose.Types.ObjectId;
  navbarCategoryId: mongoose.Types.ObjectId;
  isActive: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const SubCategorySchema = new Schema<ISubCategory>(
  {
    name: {
      type: String,
      required: [true, 'SubCategory name is required'],
      trim: true,
    },
    slug: {
      type: String,
      required: [true, 'Slug is required'],
      unique: true,
      trim: true,
      lowercase: true,
    },
    description: {
      type: String,
      trim: true,
    },
    image: {
      type: String,
      trim: true,
    },
    imagePublicId: {
      type: String,
      trim: true,
    },
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      required: [true, 'Category is required'],
    },
    navbarCategoryId: {
      type: Schema.Types.ObjectId,
      ref: 'NavbarCategory',
      required: [true, 'Navbar Category is required'],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Create compound index for efficient queries
SubCategorySchema.index({ categoryId: 1, order: 1, isActive: 1 });
SubCategorySchema.index({ navbarCategoryId: 1, categoryId: 1 });

const SubCategory = mongoose.models.SubCategory || mongoose.model<ISubCategory>('SubCategory', SubCategorySchema);

export default SubCategory;

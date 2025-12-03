import mongoose, { Schema, Document, Model } from 'mongoose';

export interface INavbarCategory extends Document {
  name: string;
  slug: string;
  href: string;
  order: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const NavbarCategorySchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Category name is required'],
      trim: true,
      minlength: [2, 'Category name must be at least 2 characters'],
      maxlength: [50, 'Category name must be less than 50 characters'],
    },
    slug: {
      type: String,
      required: [true, 'Slug is required'],
      unique: true,
      trim: true,
      lowercase: true,
    },
    href: {
      type: String,
      required: [true, 'URL path is required'],
      trim: true,
    },
    order: {
      type: Number,
      required: true,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Index for faster queries
NavbarCategorySchema.index({ order: 1, isActive: 1 });

const NavbarCategory: Model<INavbarCategory> =
  mongoose.models.NavbarCategory || mongoose.model<INavbarCategory>('NavbarCategory', NavbarCategorySchema);

export default NavbarCategory;

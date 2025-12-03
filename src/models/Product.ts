import mongoose, { Schema, Document } from 'mongoose';

export interface IProduct extends Document {
  name: string;
  slug: string;
  description?: string;
  keyFeatures: string[];
  images: {
    url: string;
    publicId: string;
  }[];
  subcategoryId: mongoose.Types.ObjectId;
  categoryId: mongoose.Types.ObjectId;
  navbarCategoryId: mongoose.Types.ObjectId;
  isActive: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: [true, 'Product name is required'],
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
    keyFeatures: {
      type: [String],
      default: [],
    },
    images: [
      {
        url: {
          type: String,
          required: true,
        },
        publicId: {
          type: String,
          required: true,
        },
      },
    ],
    subcategoryId: {
      type: Schema.Types.ObjectId,
      ref: 'SubCategory',
      required: [true, 'SubCategory is required'],
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

// Create compound indexes for efficient queries
ProductSchema.index({ subcategoryId: 1, order: 1, isActive: 1 });
ProductSchema.index({ categoryId: 1, isActive: 1 });
ProductSchema.index({ navbarCategoryId: 1, isActive: 1 });

const Product = mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema);

export default Product;

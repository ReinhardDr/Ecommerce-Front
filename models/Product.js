// models/Product.js
import mongoose, { model, Schema, models } from "mongoose";
import slugify from "slugify";

const ProductSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    slug: { type: String, required: true, unique: true },
    topic: { type: String, required: true },
    price: { type: Number, required: true },
    images: { type: [String] },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
    properties: { type: Object },
  },
  {
    timestamps: true,
  }
);

// Pre-save hook để tự động tạo slug từ title
ProductSchema.pre("save", function (next) {
  if (this.isNew || this.isModified("title")) {
    if (!this.slug) {
      // Tạo slug từ title và thêm timestamp để đảm bảo unique
      const timestamp = new Date().getTime().toString().slice(-4);
      this.slug = slugify(this.title, { lower: true, strict: true }) + '-' + timestamp;
    }
  }
  next();
});

export const Product = models.Product || model('Product', ProductSchema);
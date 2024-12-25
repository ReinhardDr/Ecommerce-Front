// import mongoose, {model, Schema, models} from "mongoose";

// const ProductSchema = new Schema({
//   title: {type:String, required:true},
//   description: String,
//   topic:String,
//   price: {type: Number, required: true},
//   images: [{type:String}],
//   category: {type:mongoose.Types.ObjectId, ref:'Category'},
//   properties: {type:Object},
// }, {
//   timestamps: true,
// });

// export const Product = models.Product || model('Product', ProductSchema);
import mongoose, {model, Schema, models} from "mongoose";
const ProductSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  topic: { type: String, required: true },
  price: { type: Number, required: true },
  images: { type: [String] },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  properties: { type: Object },
}, {
  timestamps: true,
});

export const Product = models.Product || model('Product', ProductSchema);

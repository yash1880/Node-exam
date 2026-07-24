const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  imageUrl: { type: String, default: '' },
  ingredients: { type: [String], required: true },
  instructions: { type: [String], required: true },
  category: { type: String, default: 'General' },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }]
}, { timestamps: true });

module.exports = mongoose.model('Recipe', recipeSchema);

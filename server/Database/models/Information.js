const mongoose = require('mongoose');

const informationSchema = new mongoose.Schema({
  contentType: { type: String, enum: ["news", "laws", "loans", "videos", "history"], required: [true, "Please Provide a Content Type"] },
  title: { type: String, required: [true, "Please Provide a title for the information"] },
  body: { type: String, required: [true, "Please provide a body for the information"] },
  images: {
    type: [String]
  }, sources: { type: String },
  postDate: { type: Date, required: true, default: Date.now },
  ourPerspective: { type: String },
  videoUrl: { type: String },
  interestRate: { type: String },
  terms: { type: String },
  booksParagraph: { type: String },
  reviewsYetekabekoch: { type: String },
  detailsRequirements: { type: String },
  reviewsYebalemuyawochi: { type: String },
  detailsRequiremnts: { type: String }
});

module.exports = mongoose.model('Information', informationSchema);

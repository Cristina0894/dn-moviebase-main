import mongoose from 'mongoose';

global.models = global.models || {};

global.models.History =
  global.models.History ||
  mongoose.model('History', {
    id: { type: Number, required: true},
    title: { type: String, required: true},
    posterPath: { type: String, required: true},
  });

export default global.models.History;

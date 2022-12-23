import mongoose from 'mongoose';

global.models = global.models || {};

global.models.Watchlist =
  global.models.Watchlist ||
  mongoose.model('Watchlist', {
    id: { type: Number, required: true },
    title: { type: String, required: true },
    posterPath: { type: String, required: true},
  });

export default global.models.Watchlist;

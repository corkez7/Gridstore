const mongoose = require('mongoose');

const ConfigurationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  dimensions: {
    width: { type: Number, required: true },
    length: { type: Number, required: true },
    height: { type: Number, required: true },
  },
  useCase: { type: String, required: true },
  bins: [
    {
      type: { type: String },
      width: { type: Number },
      height: { type: Number },
      color: { type: String },
    }
  ],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Configuration', ConfigurationSchema);

const { Schema, model } = require('mongoose');

const goalSchema = new Schema({
  description: {
    type: String,
    required: true,
  },
  targetAmount: {
    type: Number,
    required: true,
  },
  targetDate: {
    type: Date,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
});



const Goal = model('Goal', goalSchema);

module.exports = { Goal };
const { Schema, model } = require('mongoose');

const billReminderSchema = new Schema({
    name: {
      type: String,
      required: true,
    },
    dueDate: {
      type: Date,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  });

  const BillReminder = model('BillReminder', billReminderSchema);

  module.exports = { BillReminder };

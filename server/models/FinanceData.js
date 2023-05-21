const { Schema, model } = require('mongoose');

const financeDataSchema = new Schema({
  month: { type: Number, required: true },
  year: { type: Number, required: true },
  expenses: { type: Number, required: true },
  income: { type: Number, required: true },
  investments: { type: Number, required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true }
});

module.exports = model('FinanceData', financeDataSchema);
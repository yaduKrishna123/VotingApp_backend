const mongoose = require('mongoose');

const pollSchema = new mongoose.Schema({
  question: String,
  options: [
    {
      text: String,
      votes: { type: Number, default: 0 },
    },
  ],
});

const Poll = mongoose.model('Poll', pollSchema);

module.exports = Poll;
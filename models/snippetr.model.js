const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types
const Schema = mongoose.Schema;

const snippetrSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  story: {
    type: String,
    required: true,
    trim: true,
  },
  image: {
    type: String,
    required: true,
  },
  postedBy: {
    type: ObjectId,
    required: true,
    ref: "User"
  },
  likes: [
    {
      type: String
    }
  ]
},
{
  timestamps: true
});

const Snippetr = mongoose.model('Snippetr', snippetrSchema);

module.exports = Snippetr

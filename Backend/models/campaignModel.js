import mongoose from 'mongoose';

const campaignSchema = new mongoose.Schema({
  type: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  reward: { type: String, required: true },
  goalAmount: { type: Number, required: true },
  collectedAmount: { type: Number, default: 0 },
  imageUrl: { type: String },
  likes: { type: Number, default: 0 },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  comments: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
      text: { type: String, required: true },
      createdAt: { type: Date, default: Date.now },
    },
  ],
}, { timestamps: true });

export default mongoose.model('Campaign', campaignSchema);

import mongoose from 'mongoose';

const quizSchema = new mongoose.Schema({
  question:       { type: String, required: true },
  option_a:       { type: String, required: true },
  option_b:       { type: String, required: true },
  option_c:       { type: String, required: true },
  option_d:       { type: String, required: true },
  correct_answer: { type: String, required: true }
}, { timestamps: true });

export default mongoose.model('Quiz', quizSchema);

import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
  student_name:  { type: String, required: true },
  student_email: { type: String, required: true },
  comment:       { type: String, required: true },
  status:        { type: String, default: 'pending' },
  answer:        { type: String, default: '' }
}, { timestamps: true });

export default mongoose.model('Comment', commentSchema);

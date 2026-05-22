import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
  course_name: { type: String, required: true },
  course_link: { type: String, required: true }
}, { timestamps: true });

export default mongoose.model('Course', courseSchema);

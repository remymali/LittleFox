import mongoose from 'mongoose';

const teacherSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  subject: { type: String, required: true },
  class: { type: String, required: true },
  education: [{
    degree: { type: String, required: true },
    college: { type: String, required: true },
    yearCompleted: { type: Number, required: true },
  }],
});

const Teacher = mongoose.model('Teacher', teacherSchema);

export default Teacher;

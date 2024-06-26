import mongoose from 'mongoose';
import  bcrypt from 'bcryptjs'

const teacherSchema = new mongoose.Schema({
  name: { type: String ,required:true},
  email: { type: String,required :true},
  password: { type: String,required :true},
  role: { type: String },
  subject: { type: String},
  class: { type: String},
  profileImg: { type: String},
  education: [{
    degree: { type: String},
    college: { type: String},
    yearCompleted: { type: Number},
  }],
  averageRating: { type: Number, default: 0 },
  totalStars: { type: Number, default: 0 },
  totalRatings: { type: Number, default: 0 },
  reviewComment: { type: String },
});

teacherSchema.pre('save', async function (next) {
  try {
    if (!this.isModified('password')) {
      return next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    return next();
  } catch (error) {
    return next(error);
  }
});

const Teacher = mongoose.model('Teacher', teacherSchema);

export default Teacher;

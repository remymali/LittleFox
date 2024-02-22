import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  dateOfBirth: { type: Date },
  gender: { type: String, enum: ['Male', 'Female'] },
  nationality: { type: String },
  placeOfBirth: { type: String },
  homeAddress: { type: String },
  contactNumber: { type: String },
  profileImg: { type: String},
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String },
  isBlocked:{type:Boolean,default:false},
  class: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'sClass'
  },
  dateOfJoin: { type: Date },
  exams: [
    {
      examName: { type: String },
      examDate: { type: Date },
      subjects: [
        {
          subjectId: { type: String },
          subjectName: { type: String },
          marks: { type: Number },
        },
      ],
    },
  ],
  attendance: [
    {
      date: { type: Date },
      status: { type: String, enum: ['Present', 'Absent'] },
    },
  ],
  activities: [
    {
      activityName: { type: String },
      activityDate: { type: Date },
      description: { type: String },
    },
  ],
  schoolMessages: [
    {
      sender: {
        senderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        email: { type: String },
        role: { type: String },
        _id: false // Exclude _id from subdocument
      },
      title: { type: String },
      details: { type: String },
      date: { type: Date, default: Date.now }
    }
  ]
});

studentSchema.pre('save', async function (next) {
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

const Student = mongoose.model('Student', studentSchema);

export default Student;

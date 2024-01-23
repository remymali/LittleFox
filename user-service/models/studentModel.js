import mongoose  from 'mongoose';

const studentSchema = new mongoose.Schema({
  studentInfo: {
    fullName: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    gender: { type: String, enum: ['Male', 'Female', 'Other'], required: true },
    nationality: { type: String, required: true },
    placeOfBirth: { type: String, required: true },
    homeAddress: { type: String, required: true },
    contactNumber: { type: String, required: true },
    emailAddress: { type: String },
    class: {
        className: { type: String, required: true },
    teacher: {
      teacherName: { type: String, required: true },
      teacherEmail: { type: String, required: true },
            },
         },
    admissionNumber: { type: String, required: true ,unique:true},
    dateOfJoin: { type: String, required: true },
    Exam: [
      {
        examName: { type: String, required: true },
        examDate: { type: Date, required: true },
        subjects: [
          {
            subjectName: { type: String, required: true },
            marks: { type: Number, required: true },
          },
        ],
      },
    ],
    Attendance: [
      {
        date: { type: Date, required: true },
        status: { type: String, enum: ['Present', 'Absent'], required: true },
      },
    ],
    Activity: [
      {
        activityName: { type: String, required: true },
        activityDate: { type: Date, required: true },
        description: { type: String },
      },
    ],
  },
});

const Student = mongoose.model('Student', studentSchema);

export default Student;

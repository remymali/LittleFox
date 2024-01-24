import mongoose  from 'mongoose';

const studentSchema = new mongoose.Schema({
    name: { type: String },
    dateOfBirth: { type: Date },
    gender: { type: String, enum: ['Male', 'Female', 'Other'] },
    nationality: { type: String  },
    placeOfBirth: { type: String },
    homeAddress: { type: String },
    contactNumber: { type: String},
    email: { type: String },
    password:{type: String ,default :'1234'},
    role:{type:String},
    class: {
        className: { type: String},
    teacher: {
      teacherName: { type: String },
      teacherEmail: { type: String },
            },
         },
    admissionNumber: { type: String},
    dateOfJoin: { type: String },
    Exam: [
      {
        examName: { type: String },
        examDate: { type: Date },
        subjects: [
          {
            subjectName: { type: String},
            marks: { type: Number },    
          },
        ],
      },
    ],
    Attendance: [
      {
        date: { type: Date },
        status: { type: String, enum: ['Present', 'Absent'] },
      },
    ],
    Activity: [
      {
        activityName: { type: String },
        activityDate: { type: Date },
        description: { type: String },
      },
    ],
  
});

studentSchema.pre('save',async function(next){
  if(!this.isModified('password'))
  {
      next();
  }

  const salt=await bcrypt.genSalt(10);
  this.password =await bcrypt.hash(this.password,salt);
});


const Student = mongoose.model('Student', studentSchema);

export default Student;

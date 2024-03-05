import mongoose from "mongoose";

const paymentSchema = mongoose.Schema({
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student'
    },
    amount: Number,
    currency: { type: String },
    paymentDetails: {type : String},
    date: { type: Date, default: Date.now },
    status: { type: String, default: 'pending' }, // Default value for status
    description: String
});

// Pre-save hook to update status to 'paid' before saving
paymentSchema.pre('save', function (next) {
    if (this.isNew) { // Check if the document is newly created
        this.status = 'paid';
    }
    next();
});

const payment = mongoose.model('Payment', paymentSchema);
export default payment;

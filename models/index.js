import mongoose from 'mongoose';

const db = {};
db.mongoose = mongoose;
db.url = process.env.MONGODB || 'mongodb+srv://mongoigti:040283hA@cluster0.2rxb2.mongodb.net/IGTI?retryWrites=true&w=majority';

const gradeSchema = db.mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    value: {
        type: Number,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now(),
        required: true
    },
    lastModified: {
        type: Date,
    }
    
});

db.gradesSchema = db.mongoose.model('grades', gradeSchema, 'grades');

export { db };

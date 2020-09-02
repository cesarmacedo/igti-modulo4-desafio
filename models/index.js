import mongoose from 'mongoose';
import dotenv from 'dotenv'
dotenv.config()
const db = {};
db.mongoose = mongoose;
db.url = process.env.MONGODB;

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

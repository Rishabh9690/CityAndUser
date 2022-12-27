const mongoose= require('mongoose');
const userSchema= new mongoose.Schema({
    Name:{
        type: String,
        required: true
    },
    City:{
        type: String,
        required: true
    },
    Mobile:{
        type: Number,
        unique: true
    },
    url:{
        type: String,
        unique: true
    },
    Id:{
        type: Number,
        unique: true
    },
    isDeleted:{
        type: Boolean,
        default: false
    },
    createdAt: Date,
    updateAt: Date
}, {timestamps: true});

module.exports= mongoose.model("User", userSchema);
/**
 * Created by Qinyifan on 18/2/25.
 */
const mongoose = require('mongoose');

export const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: [(email) => {
            return /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(email)
        }, "Invalid email"]
    },
    password: {
        type: String,
        validate: [(password) => {
            return /.+/.test(password)
        }, "password cannot be none!"]
    }
});

export const noteSchema = new mongoose.Schema({
    tag :{
        type: String,
        enum:["Study","Life","Love","Tech"]
    },
    description: {
        type: String
    },
    status:{
        type: Boolean, // true -> finished, false -> unfinished
        default: false
    },
    // status:{
    //     type:String,
    //     enum:["Pending","Doing","Due","Done"]
    // },
    author:{
        name:String,
        id:String // corresponding to _id in user . This id is just for a unique identifier for the user
    },
    updateTime:{
        type:Date,
        default:Date.now
    },
    expectedTime:{
        type:Date,
    },
    details:{
        type:String // markdown
    }

});

export const articleSchema = new mongoose.Schema({
    title:{
        type:String
    },
    tag:{
        type:String,
        default:"default"
    },
    author:{
        name:String,
        id:String // corresponding to _id in user . This id is just for a unique identifier for the user
    },
    content:{
        type:String
    },
    updateTime:{
        type:Date,
        default:Date.now
    },
    viewTimes:{
        type:Number,
        default:0
    }
});


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
    tag: {
        type: String,
        enum: ["Study", "Life", "Love", "Tech"]
    },
    description: {
        type: String
    },
    status: {
        type: Boolean, // true -> finished, false -> unfinished
        default: false
    },
    // status:{
    //     type:String,
    //     enum:["Pending","Doing","Due","Done"]
    // },
    author: {
        name: String,
        id: String // corresponding to _id in user . This id is just for a unique identifier for the user
    },
    updateTime: {
        type: Date,
        default: Date.now
    },
    expectedTime: {
        type: Date,
    },
    details: {
        type: String // markdown
    }

});

export const articleSchema = new mongoose.Schema({
    title: {
        type: String
    },
    tag: {
        type: String,
        default: "default"
    },
    author: {
        name: String,
        id: String // corresponding to _id in user . This id is just for a unique identifier for the user
    },
    content: {
        type: String
    },
    updateTime: {
        type: Date,
        default: Date.now
    },
    viewTimes: {
        type: Number,
        default: 0
    }
});

export const easyAccountRoomSchema = new mongoose.Schema({
    id: { // the id of one record
        type: String,
        required: true,
        unique: true
    },
    people: {
        type: Array,
        required: true
    },
    createTime: {
        type: Date,
        default: Date.now
    },
    password: {
        type: String
    },
    currencyUnit: {
        type: String,
        default: 'USD'
    }
});

export const easyAccountRecordSchema = new mongoose.Schema({
    roomId: { // roomId
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    event: {
        type: String,
        required: true
    },
    totalAmount: {
        type: Number
    },
    involvedPeople: {
        type: [String]
    },
    averageAmount: {
        type: Number
    },
    time: {
        type: Date
    },
    comment: {
        type: String
    }
});

export const easyAccountAuthUserSchema = new mongoose.Schema({
    token: {
        type: String,
    },
    createAt: {
        type: Date,
        expires: 3600*24, // '1m' does not work at all!
        default: Date.now
    },
    roomId: {
        type: String
    },
});
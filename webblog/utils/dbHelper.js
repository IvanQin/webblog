/**
 * Created by Qinyifan on 17/12/27.
 */
const mongoose = require('mongoose');

const DEFAULT_DB_NAME = "";
const HOST = "mongodb://127.0.0.1:27017/";

const userSchema = new mongoose.Schema({
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

const notesSchema = new mongoose.Schema({
    category :{
        type: String,
        enum:["Study","Life","Love"]
    },
    description: {
        type: String
    },
    status:{
        type:String,
        enum:["Pending","Doing","Finished"]
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId
    }

});

const articleSchema = new mongoose.Schema({
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
const mapNameToSchema = {
    "user": userSchema,
    "article": articleSchema,
    "notes": notesSchema
};
/**
 *
 * @param dbRequestTemplate a JSON string, not a JSON object!
 * @constructor
 */
const DBRequest = function (dbRequestTemplate) {
    let dbReqObj = JSON.parse(dbRequestTemplate);
    this.dbName = dbReqObj.dbName ? dbReqObj.dbName : DEFAULT_DB_NAME;
    this.collectionName = dbReqObj.collectionName;
    this.operation = dbReqObj.operation;
    this.schema = mapNameToSchema[this.collectionName];
    this.document = dbReqObj.document;
    this.updateDoc = dbReqObj.updateDoc;
};

function dbDisconnect() {
    return mongoose.disconnect();
}

/**
 * Insertion in mongodb
 * @param document document of mongodb
 * @param Model model of mongodb
 */
function dbInsert(document, Model) {
    return new Promise((resolve, reject) => {
        let model = new Model(document);
        model.save((err, res) => {
            if (err) {
                reject(err);
            }
            //console.log(res);
            dbDisconnect();
            resolve("Success!");
        }).then();
    });
    // Model.create(document, (err, res) => {
    //     if (err) {
    //         sendErrorMessage();
    //         console.log(err);
    //     }
    //     console.log(res);
    //     dbDisconnect();
    // }).then();

}
function dbDelete(document, Model) {
    return new Promise((resolve, reject) => {
        Model.remove(document, (err, res) => {
            if (err) {
                reject(err);
            }
            dbDisconnect();
            resolve(res);
        });
    })
}

function dbUpdate(document, updateDoc, Model) {
    return new Promise((resolve, reject) => {
        Model.update(document, updateDoc, (err, res) => {
            if (err) {
                reject(err);
            }
            dbDisconnect();
            resolve(res);
        })
    })
}
function dbSearch(document, Model) {
    return new Promise((resolve, reject) => {
        Model.find(document, (err, res) => {
            if (err) {
                reject(err);
            }
            dbDisconnect();
            resolve(res);
        });
    });
}
function dbSearchById(document, Model){
    return new Promise((resolve,reject)=>{
        Model.findById(document.id,(err,res)=>{ // id is a string or number
            if (err){
                reject(err);
            }
            dbDisconnect();
            resolve(res);
        });
    });
}

/**
 *
 * @param dbRequestTemplate a json string
 */

export function entrance(dbRequestTemplate) {

    let dbRequest = new DBRequest(dbRequestTemplate);
    mongoose.connect(HOST + dbRequest.dbName);
    let Model = mongoose.model(dbRequest.collectionName, dbRequest.schema);
    let retPromise;
    switch (dbRequest.operation) {
        case 0:
            retPromise = dbInsert(dbRequest.document, Model);
            break; // 0 --> insert
        case 1:
            retPromise = dbUpdate(dbRequest.document, dbRequest.updateDoc, Model);
            break; // 1 --> update
        case 2:
            retPromise = dbSearch(dbRequest.document, Model);
            break; // 2 --> search
        case 3:
            retPromise = dbDelete(dbRequest.document, Model);
            break; // 3 --> delete
        case 4:
            retPromise = dbSearchById(dbRequest.document,Model);
            break; // 4 --> search by id
    }
    return retPromise;
}
//module.exports = entrance;
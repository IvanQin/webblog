/**
 * Created by Qinyifan on 17/12/27.
 */
import {sendErrorMessage} from './messageHandler'
const mongoose = require('mongoose');

/**

 */

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

const mapNameToSchema = {
    "user": userSchema
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
    this.schema = mapNameToSchema[this.collectionName]; // TODO: choose schema according to collection Name
    this.document = dbReqObj.document;
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
                sendErrorMessage();
                //console.log(err);
                reject("Error!");
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

function dbSearch(document, Model) {
    Model.find(document, (err, res) => {
        if (err) {
            sendErrorMessage();
            console.log(err);
        }
        console.log(res);
        dbDisconnect();
    });
}

/**
 *
 * @param dbRequestTemplate a json string
 */
export function entrance(dbRequestTemplate) {
    // return new Promise((resolve, reject) => {
    //     let dbRequest = new DBRequest(dbRequestTemplate);
    //     mongoose.connect(HOST + dbRequest.dbName);
    //     let Model = mongoose.model(dbRequest.collectionName, dbRequest.schema);
    //     switch (dbRequest.operation) {
    //         case 0:
    //             dbInsert(dbRequest.document, Model).then(res => {
    //                 resolve(res);
    //             }, err => {
    //                 reject(err)
    //             });
    //             break; // 0 --> insert
    //         case 1:
    //             break; // 1 --> update
    //         case 2:
    //             dbSearch(dbRequest.document, Model);
    //             break; // 2 --> search
    //     }
    // });

    let dbRequest = new DBRequest(dbRequestTemplate);
    mongoose.connect(HOST + dbRequest.dbName);
    let Model = mongoose.model(dbRequest.collectionName, dbRequest.schema);
    let retPromise;
    switch (dbRequest.operation) {
        case 0:
            retPromise = dbInsert(dbRequest.document, Model);
            break; // 0 --> insert
        case 1:
            break; // 1 --> update
        case 2:
            dbSearch(dbRequest.document, Model);

            break; // 2 --> search

    }
    return retPromise;
}
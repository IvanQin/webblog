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
    name: String,
    email: String,
    password: String
});

const mapNameToSchema = {
    "user":userSchema
};
/**
 *
 * @param dbRequestTemplate a json string
 * @constructor
 */
const DBRequest = function (dbRequestTemplate) {
    this.dbName = dbRequestTemplate.dbName ? dbRequestTemplate.dbName : DEFAULT_DB_NAME;
    this.collectionName = dbRequestTemplate.collectionName;
    this.operation = dbRequestTemplate.operation;
    this.schema = mapNameToSchema[this.collectionName]; // TODO: choose schema according to collection Name
    this.document = null; // TODO
};

/**
 * Insertion in mongodb
 * @param document document of mongodb
 * @param Model model of mongodb
 */
function dbInsert(document,Model) {
    Model.save(document,(err,res) => {
        if (err){
            sendErrorMessage();
            console.log(err);
        }
        console.log(res);
    });
}

/**
 *
 * @param dbRequestTemplate a json string
 */
export function entrance(dbRequestTemplate) {
    let dbRequest = new DBRequest(dbRequestTemplate);
    mongoose.connect(HOST + dbRequest.dbName);
    let Model = mongoose.model(dbRequest.collectionName,dbRequest.schema);
    switch (dbRequest.operation){
        case 0: dbInsert(dbRequest.document,Model);break; // 0 --> insert
        case 1: break; // 1 --> update
    }
    return Model;
}
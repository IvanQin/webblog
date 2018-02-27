/**
 * Created by Qinyifan on 18/1/31.
 */
const DEFAULT_DB_NAME = "test";
/**
 * Generate template for db operation between frontend and backend
 * @param opID: operation ID ( defined in expressServer/utils/dbHelper.js )
 * @param collectionName: the name of collection to operate in mongodb
 * @param data: content
 * @returns {{dbName: string, collectionName: *, operation: *, document: *, updateDoc: *}}
 */
export function getDbOperationTemplate(opID,collectionName,data){
    let dbName = DEFAULT_DB_NAME;
    let template = {
        "dbName": dbName,
        "collectionName": collectionName,
        "operation": opID,
        "document": data.document?data.document:{},
        "updateDoc": data.updateDoc?data.updateDoc:{},
        "projectionDoc": data.projectionDoc? data.projectionDoc:{}
    };
    return template;
};
//module.exports = getDbOperationTemplate;

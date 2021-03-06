const helper = require('../helper.js');


const AutorbildDao = require("../dao/autorbildDao.js");

function loadAdditionalData(json_author, dbConnection) {
    console.log(json_author);

    //Bildpfad einfügen
    autorbildDao = new AutorbildDao(dbConnection);
    json_author["bildpfad"] = autorbildDao.loadById(json_author["bildid"])["bildpfad"];

    return json_author;
}

class AutorDao {
    constructor(dbConnection) {
        this._conn = dbConnection;
    }

    getConnection() {
        return this._conn;
    }

    loadAll() {
        var sql= 'SELECT * FROM AUTOR';
        var statement = this._conn.prepare(sql);
        var result = statement.all();

        if (helper.isArrayEmpty(result)) 
            return [];      
        
        return helper.arrayObjectKeysToLower(result);
    }

    loadById(id) {
        var sql = 'SELECT * FROM Autor WHERE ID=?';
        var statement = this._conn.prepare(sql);
        var result = statement.get(id);

        if (helper.isUndefined(result)) 
            throw new Error('No Record found by id=' + id);

        result = helper.objectKeysToLower(result);
        return loadAdditionalData(helper.objectKeysToLower(result), this._conn);
    }

    toString() {
        helper.log('AutorDao [_conn=' + this._conn + ']');
    }


    loadSuche(suchwort){
    
        
        var sql = "SELECT * FROM Autor WHERE Name LIKE '%" + suchwort + "%'";

        var statement = this._conn.prepare(sql);
        var result = statement.all();

        if (helper.isArrayEmpty(result)) 
            return [];
    
        
        return helper.arrayObjectKeysToLower(result);

    }



}

module.exports = AutorDao;
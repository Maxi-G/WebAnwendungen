const { request } = require('express');
const helper = require('../helper.js');

const BestellungDao = require("./bestellungDao");
const BuchDao = require("./buchDao");


function loadAdditionalData(json_bestellungen, dbConnection) {
    buchDao = new BuchDao(dbConnection);

    //lädt Buchdaten zu passenden Büchern
    for (let i=0; i<json_bestellungen.length; i++) {  
        json_bestellungen[i]["Buch"] = buchDao.loadById(json_bestellungen[i]["buchid"]);   
    }  

    return json_bestellungen;
}


class BestellpositionDao {
    constructor(dbConnection) {
        this._conn = dbConnection;
    }

    getConnection() {
        return this._conn;
    }

    //alle User Bücher laden
    loadUserEntries(id) {
        var sql = 'SELECT * FROM BESTELLPOSITION WHERE BESTELLUNGID IN (SELECT ID FROM BESTELLUNG WHERE BESTELLERID=?)';
        var statement = this._conn.prepare(sql);
        var result = statement.all(id);

        if (helper.isArrayEmpty(result)) 
            return [];       
        
        return loadAdditionalData(helper.arrayObjectKeysToLower(result), this._conn);
    }    


    insertOrderPosition(order_ID, book_ID){

        var sql = 'INSERT INTO Bestellposition (BestellungID, BuchID) VALUES(?, ?);';
        var statement = this._conn.prepare(sql);
        var params = [order_ID, book_ID];
        var result = statement.run(params);

        if (result.changes != 1) 
            throw new Error('Could not insert new Record. Data: ' + params);

        return result.lastInsertRowid;
    }
    

    loadAll() {
        var sql = 'SELECT * FROM Bestellposition';
        var statement = this._conn.prepare(sql);
        var result = statement.all();

        if (helper.isArrayEmpty(result)) 
            return [];
        
        return loadAdditionalData(helper.arrayObjectKeysToLower(result), this._conn);
    }

    toString() {
        helper.log('BestellpositionDao [_conn=' + this._conn + ']');
    }
}

module.exports = BestellpositionDao;
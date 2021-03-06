const helper = require('../helper.js');

class BuchgenreDao {
    constructor(dbConnection) {
        this._conn = dbConnection;
    }

    getConnection() {
        return this._conn;
    }

    loadAll() {
        var sql = 'SELECT * FROM BUCHGENRE';
        var statement = this._conn.prepare(sql);
        var result = statement.all();

        if (helper.isArrayEmpty(result)) 
            return [];
    
        return helper.arrayObjectKeysToLower(result);
    }

    

    loadById(id) {
        var sql = 'SELECT * FROM Buchgenre WHERE ID=?';
        var statement = this._conn.prepare(sql);
        var result = statement.get(id);

        if (helper.isUndefined(result)) 
            throw new Error('No Record found by id=' + id);

        result = helper.objectKeysToLower(result);
        return result;
    }

    toString() {
        helper.log('BuchgenreDao [_conn=' + this._conn + ']');
    }
}

module.exports = BuchgenreDao;
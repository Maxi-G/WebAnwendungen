const Database = require('better-sqlite3');
const path = require("path");
const dbOptions = { verbose: console.log };
const dbFile = path.join(__dirname, "../db/datenbank.sqlite");     
const dbConnection = new Database(dbFile, dbOptions);
const AutorDao  = require('../dao/autorDao');
const autorDao = new AutorDao(dbConnection);

const valide_suchworte=["Herman","E.T.A", ".T"];  
const invalide_suchworte=["invalDI!7dgas&", "DjS72hbsaghgt2gCV","hjTD27v!§RE", "dfdbsjdjdb", "dsFfffffffffh", "djas!!hdUd", "SUperDinInvalid!ds"];


test('AutorDao: Alle Autoren laden und ein valides Ergebnis liefern ' , () => {
    let result = autorDao.loadAll();
    expect(result).toBeDefined();
    expect(CheckAutorAttribute(result));
});


test.each(valide_suchworte)('AutorDao: Suche mit validem Suchwort soll ein valides Ergebnis liefern' , (valides_suchwort) => {
    let result = autorDao.loadSuche(valides_suchwort);
    expect(result).toBeDefined();
    expect(CheckAutorAttribute(result));
});


test.each(invalide_suchworte)('AutorDao: Suche mit validem Suchwort soll ein leeres Ergebnis liefern' , (invalides_suchwort) => {
    let result = autorDao.loadSuche(invalides_suchwort);
    expect(result).toBeDefined();
    expect(result).toEqual([]);
   
});


// -----------     Funktionen zur Überprüfung der Parameter -------------------

function CheckAutorAttribute(result) {  //

    expect(result.length).toBeGreaterThanOrEqual(1)

    for(let i=0; i<result.length;i++){
        expect(result[i].id).toBeDefined();
        expect(result[i].name).toBeDefined();
        expect(result[i].age).toBeDefined();
        expect(result[i].geboren).toBeDefined();
        expect(result[i].gestorben).toBeDefined();
        expect(result[i].publikationen).toBeDefined();
        expect(result[i].bildid).toBeDefined();
        expect(result[i].biografie).toBeDefined();
    }
}

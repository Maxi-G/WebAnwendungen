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
    expect(CheckAutorAttribute(result)).toBeTruthy();
});


test.each(valide_suchworte)('AutorDao: Suche mit validem Suchwort soll ein valides Ergebnis liefern' , (valides_suchwort) => {
    let result = autorDao.loadSuche(valides_suchwort);
    expect(result).toBeDefined();
    expect(CheckAutorAttribute(result)).toBeTruthy();
});


test.each(invalide_suchworte)('AutorDao: Suche mit validem Suchwort soll ein leeres Ergebnis liefern' , (invalides_suchwort) => {
    let result = autorDao.loadSuche(invalides_suchwort);
    expect(result).toBeDefined();
    expect(result).toEqual([]);
   
});


// -----------     Funktionen zur Überprüfung der Parameter -------------------

function CheckAutorAttribute(result) {  //
    if(result.length==0){throw new Error("Das Ergebnis ist leer!");} 
    for(let i=0; i<result.length;i++){
        if(result[i].id==undefined){ throw new Error("id ist nicht definiert!"); }
        if(result[i].name==undefined){ throw new Error("name ist nicht definiert!"); }
        if(result[i].age==undefined){ throw new Error("age ist nicht definiert!"); }
        if(result[i].geboren==undefined){ throw new Error("geboren ist nicht definiert!"); }
        if(result[i].gestorben==undefined){ throw new Error("gestorben ist nicht definiert!"); }
        if(result[i].publikationen==undefined){ throw new Error("publikationen ist nicht definiert!"); }
        if(result[i].bildid==undefined){ throw new Error("bildid ist nicht definiert!"); }
        if(result[i].biografie==undefined){ throw new Error("biografie ist nicht definiert!"); }
    }
    return true;
}


const Database = require('better-sqlite3');
const path = require("path");
const dbOptions = { verbose: console.log };
const dbFile = path.join(__dirname, "../db/datenbank.sqlite");     
const dbConnection = new Database(dbFile, dbOptions);

const BuchDao  = require('../dao/buchdao');
const buchdao = new BuchDao(dbConnection);


test('BuchDao Buch über ID laden' , () => {
    let valid_IDs = buchdao.JEST_load_all_idS();

    expect(valid_IDs).toBeDefined();
    expect(valid_IDs.length).toBeGreaterThanOrEqual(1); // Mindestens eine ID sollte gefunden werden!
   
    for(let i=0; i<valid_IDs.length;i++){
        let result = buchdao.loadById(valid_IDs[i]);
        expect(result).toBeDefined();
        expect(CheckBuchAttribute(result)).toBeTruthy();
    }
    
    
    
});



function CheckBuchAttribute(result) {
    if(result.length==0){throw new Error("Das Ergebnis ist leer!")} // Es sind keine Bücher in der Datenbank --> False
    for(let i=0; i<result.length;i++){
        if(result[i].anzahlbew==undefined){throw new Error("anzahlbew nicht definiert!")}
        if(result[i].authorid==undefined){throw new Error("authorid nicht definiert!")}
        if(result[i].autor_name==undefined){throw new Error("autor_name nicht definiert!")}
        if(result[i].bildid==undefined){throw new Error("bildid nicht definiert!")}
        if(result[i].bildpfad==undefined){throw new Error("bildpfad nicht definiert!")}
        if(result[i].genreid==undefined){throw new Error("genreid nicht definiert!")}
        if(result[i].gesamtbewertung==undefined){throw new Error("gesamtbewertung nicht definiert!")}
        if(result[i].id==undefined){throw new Error("id nicht definiert!")}
        if(result[i].isbn==undefined){throw new Error("isbn nicht definiert!")}
        if(result[i].kurzbeschreibung==undefined){throw new Error("kurzbeschreibung nicht definiert!")}
        if(result[i].mehrwertsteuerid==undefined){throw new Error("mehrwertsteuerid nicht definiert!")}
        if(result[i].preis==undefined){throw new Error("preis nicht definiert!")}
        if(result[i].titel==undefined){throw new Error("titel nicht definiert!")}
    }
    return true;
}

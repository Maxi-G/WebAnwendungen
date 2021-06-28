const Database = require('better-sqlite3');
const path = require("path");
const dbOptions = { verbose: console.log };
const dbFile = path.join(__dirname, "../db/datenbank.sqlite");     
const dbConnection = new Database(dbFile, dbOptions);
const ShopDao  = require('../dao/shopDao');
const shopDao = new ShopDao(dbConnection);
const invalide_suchworte=["INVSSKCUDE","NFdSsd23sda!S!D","ghdSAdssdds","fd12dssd23sjkf!", "MEGDtFDDDDDDD1S"];
const valide_suchworte=["Der Sandmann", "Sand", "Der", "Nordpol", "Fräulein"];



// Teste "Alle Bücher laden" Funktion. --> Ein Array mit mit den Büchern ist zu erwarten
test('ShopDao alle Bücher laden' , () => {
    let result = shopDao.loadAll();
    expect(result).toBeDefined();
    expect(CheckBuchAttribute(result)).toBeTruthy();
});


// Teste Suche mit invaliden Suchbegriffen ---> Ein leeres Array ist zu erwarten
test.each(invalide_suchworte)('ShopDao: Suche mit validem Suchwort soll ein valides Ergebnis liefern' , (invalides_suchwort) => {
    let result = shopDao.loadSuche(invalides_suchwort);
    expect(result).toBeDefined();
    expect(result).toEqual([]);
});


// Teste Suche mit validen Suchbegriffen ---> Ein Array mit den Büchern ist zu erwarten
test.each(valide_suchworte)('ShopDao: Suche mit invaliden Suchworten soll ein leeres Ergebnis liefern',(valides_suchwort) => {
    let result = shopDao.loadSuche(valides_suchwort);
    expect(result).toBeDefined();
    expect(CheckBuchAttribute(result)).toBeTruthy();
});



// Attribute aller Bücher im Array überüfen
function CheckBuchAttribute(result) {
    if(result.length==0){throw new Error("Array ist leer!")}
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

const Database = require('better-sqlite3');
const exp = require('constants');
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
    expect(CheckBuchAttribute(result))
});


// Teste Suche mit invaliden Suchbegriffen ---> Ein leeres Array ist zu erwarten
test.each(invalide_suchworte)('ShopDao: Suche mit invalidem Suchwort soll ein leeres Ergebnis liefern' , (invalides_suchwort) => {
    let invalid_such_result = shopDao.loadSuche(invalides_suchwort);
    expect(invalid_such_result).toEqual([]);
});


// Teste Suche mit validen Suchbegriffen ---> Ein Array mit den Büchern ist zu erwarten
test.each(valide_suchworte)('ShopDao: Suche mit validem Suchworten soll ein vollwertiges liefern',(valides_suchwort) => {
    let valid_such_result = shopDao.loadSuche(valides_suchwort);
    expect(valid_such_result).toBeDefined();
    expect(CheckBuchAttribute(valid_such_result))
});



// Attribute aller Bücher im Array überüfen
function CheckBuchAttribute(result) {
    expect(result.length).toBeGreaterThanOrEqual(1);

    for(let i=0; i<result.length;i++){
        expect(result[i].anzahlbew).toBeDefined();
        expect(result[i].authorid).toBeDefined();
        expect(result[i].autor_name).toBeDefined();
        expect(result[i].bildid).toBeDefined();
        expect(result[i].bildpfad).toBeDefined();
        expect(result[i].genreid).toBeDefined();
        expect(result[i].gesamtbewertung).toBeDefined();
        expect(result[i].id).toBeDefined();
        expect(result[i].isbn).toBeDefined();
        expect(result[i].kurzbeschreibung).toBeDefined();
        expect(result[i].preis).toBeDefined();
        expect(result[i].titel).toBeDefined();
    }
}


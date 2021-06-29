const Database = require('better-sqlite3'); //
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

//

// Attribute aller Bücher im Array überüfen
function CheckBuchAttribute(result) {
    expect(result.length).toBeGreaterThanOrEqual(1);

    for(let i=0; i<result.length;i++){
        expect(result[i].anzahlbew).toBeDefined();
        expect(typeof result[i].anzahlbew).toBe('number');
        expect(result[i].authorid).toBeDefined();
        expect(typeof result[i].authorid).toBe('number');
        expect(result[i].autor_name).toBeDefined();
        expect(typeof result[i].autor_name).toBe('string');
        expect(result[i].bildid).toBeDefined();
        expect(typeof result[i].bildid).toBe('number');
        expect(result[i].bildpfad).toBeDefined();
        expect(typeof result[i].bildpfad).toBe('string');
        expect(result[i].genreid).toBeDefined();
        expect(typeof result[i].genreid).toBe('number');
        expect(result[i].gesamtbewertung).toBeDefined();
        expect(typeof result[i].gesamtbewertung).toBe('number');
        expect(result[i].id).toBeDefined();
        expect(typeof result[i].id).toBe('number');
        expect(result[i].isbn).toBeDefined();
        expect(typeof result[i].isbn).toBe('string');
        expect(result[i].kurzbeschreibung).toBeDefined();
        expect(typeof result[i].kurzbeschreibung).toBe('string');
        expect(result[i].preis).toBeDefined();
        expect(typeof result[i].preis).toBe('number');
        expect(result[i].titel).toBeDefined();
        expect(typeof result[i].titel).toBe('string');
    }
}


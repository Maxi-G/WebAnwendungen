const Database = require('better-sqlite3');
const path = require("path");
const dbOptions = { verbose: console.log };
const dbFile = path.join(__dirname, "../db/datenbank.sqlite");     
const dbConnection = new Database(dbFile, dbOptions);

const AutorDao  = require('../dao/autorDao');
const autorDao = new AutorDao(dbConnection);


test('AutorDao alle Autoren laden' , () => {
    let result = autorDao.loadAll();
    expect(result).toBeDefined();
    expect(CheckAutorAttribute(result)).toBeTruthy();
});


test('AutorDao Autor Suche' , () => {
    const suchworte=["Herman" ,"halloWelt", "Buch", "suchwort",  "Nix", "Sandmann", "Test", " d3!jd87", "fdsui(DHGGHSHG", "hjsF8dn,2iD18A1","E.T.A"];  
    for(let i=0; i<suchworte;i++){
        let result = autorDao.loadSuche(suchworte[i]);
        expect(result).toBeDefined();
        expect(CheckAutorAttribute(result)).toBeTruthy();
    }
});



function CheckAutorAttribute(result) {
    if(result.length==0){return true}
    for(let i=0; i<result.length;i++){
        if(result[i].id==undefined){ throw new Error("id in JSON ist nicht definiert!"); }
        if(result[i].name==undefined){ throw new Error("name in JSON ist nicht definiert!"); }
        if(result[i].age==undefined){ throw new Error("age in JSON ist nicht definiert!"); }
        if(result[i].geboren==undefined){ throw new Error("geboren in JSON ist nicht definiert!"); }
        if(result[i].gestorben==undefined){ throw new Error("gestorben in JSON ist nicht definiert!"); }
        if(result[i].publikationen==undefined){ throw new Error("publikationen in JSON ist nicht definiert!"); }
        if(result[i].bildid==undefined){ throw new Error("bildid in JSON ist nicht definiert!"); }
        if(result[i].biografie==undefined){ throw new Error("biografie in JSON ist nicht definiert!"); }
    }
    return true;
}

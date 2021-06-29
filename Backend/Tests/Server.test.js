const supertest = require("supertest");
const app = require("../server");
const invalide_suchworte=["INVSSKCUDE","NFdSsd23sda!S!D","ghdSAdssdds","fd12dssd23sjkf!", "MEGDtFDDDDDDD1S"];
const valide_suchworte=["Der Sandmann", "Sand", "Der", "Nordpol", "Fräulein"];

// ---------------- SHOP Service Tests ------------------------- //


describe("Test Shop Route: 'Alle Bücher laden'", function() {
  it("Response sollte ein JSON mit allen Buch-Daten sein!", function(done) {
    supertest(app)
      .get("/web2/shop/gib/all")
      .expect(200)                    //expect status 200
      .expect('Content-Type', /json/) //expect to be json 
      .expect(CheckBuchAttribute)     //call function
      
      .end(function(err, res){      // Auswertung wenn alle .expect durchlaufen sind
        if(err){return done(err);}
        else{return done();}
      });
  });
});




describe("Test Shop Route: 'Suche mit validen Suchbegriffen'", function() {
  for(let i=0; i<valide_suchworte.length;i++){
    it("Response soll ein JSON mit Treffern beinhalten", function(done) {
      supertest(app)
        .get("/web2/shop/gib/suche/"+valide_suchworte[i])
        .expect(200)                    //expect status 200
        .expect('Content-Type', /json/) //expect to be json 
        .expect(CheckBuchAttribute)
        
        .end(function(err){        // Auswertung wenn alle .expect durchlaufen sind
          if(err){return done(err);}
          else{return done();}
        });
     });
  }
});



describe("Test Shop Route: 'Suche mit invaliden Suchbegriffen'", function() {
  for(let i=0; i<invalide_suchworte.length;i++){
    it("Response soll ein JSON mit leerem Daten Attribut zurückliefern", function(done) {
      supertest(app)
        .get("/web2/shop/gib/suche/"+invalide_suchworte[i])
        .expect(200)                    //expect status 200
        .expect('Content-Type', /json/) //expect to be json 
        .expect(CheckDatenContent)
        .end(function(err){        // Auswertung wenn alle .expect durchlaufen sind
          if(err){return done(err);}
          else{return done();}
        });
     });
  }
});






function CheckBuchAttribute(res) {
  expect(res.body.daten).toBeDefined();
  expect(res.body.daten.length).toBeGreaterThanOrEqual(1);

  for(let i=0; i<res.body.daten.length;i++){
        expect(res.body.daten[i].id).toBeDefined();
        expect(res.body.daten[i].titel).toBeDefined();
        expect(res.body.daten[i].kurzbeschreibung).toBeDefined();
        expect(res.body.daten[i].isbn).toBeDefined();
        expect(res.body.daten[i].preis).toBeDefined();
        expect(res.body.daten[i].authorid).toBeDefined();
        expect(res.body.daten[i].anzahlbew).toBeDefined();
        expect(res.body.daten[i].genreid).toBeDefined();
        expect(res.body.daten[i].bildid).toBeDefined();
        expect(res.body.daten[i].mehrwertsteuerid).toBeDefined();
        expect(res.body.daten[i].gesamtbewertung).toBeDefined();
        expect(res.body.daten[i].bildpfad).toBeDefined();
        expect(res.body.daten[i].autor_name).toBeDefined();
        expect(res.body.daten[i].genre).toBeDefined();
  }
}



function CheckDatenContent(res) {
    expect(res.body.daten).toBeDefined();
    expect(res.body.daten.length).toBe(0);
}











// ---------------- AUTOREN Service Tests ------------------------- //

describe("Test Autor Route: 'Alle Autoren'", function() {
  it("Response soll die entsprechenden Kriterien erfüllen", function(done) {
    supertest(app)
      .get("/web2/autor/gib/alle")
      .expect(200)                    //expect status 200
      .expect('Content-Type', /json/) //expect to be json 
      .expect(CheckAutorAttribute)     //call function
      
      .end(function(err, res){  // Auswertung wenn alle .expect durchlaufen sind
        if(err){return done(err);}
        else{return done();}
      });
  });
});



function CheckAutorAttribute(res) {
    expect(res.body.daten).toBeDefined();
    for(let i=0; i<res.body.daten;i++){
       expect(res.body.daten[i].id).toBeDefined();  
       expect(res.body.daten[i].name).toBeDefined();  
       expect(res.body.daten[i].age).toBeDefined();  
       expect(res.body.daten[i].geboren).toBeDefined();  
       expect(res.body.daten[i].gestorbe).toBeDefined();  
       expect(res.body.daten[i].publikationen).toBeDefined();  
       expect(res.body.daten[i].bildid).toBeDefined();  
       expect(res.body.daten[i].biografie).toBeDefined();  
    }
}








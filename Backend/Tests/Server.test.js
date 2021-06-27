const supertest = require("supertest");
const app = require("../server");


// ---------------- SHOP Tests ------------------------- //


describe("Test Shop Route: 'Alle Bücher'", function() {
  it("Response soll die entsprechenden Kriterien erfüllen", function(done) {
    supertest(app)
      .get("/web2/shop/gib/all")
      .expect(200)                    //expect status 200
      .expect('Content-Type', /json/) //expect to be json 
      .expect(CheckBuchAttribute)     //call function
      
      .end(function(err, res){  // Auswertung wenn alle .expect durchlaufen sind
        if(err){return done(err);}
        else{return done();}
      });
  });
});



describe("Test Shop Route: 'Maxprice'", function() {
  it("Response soll ein JSON mit Preis liefern", function(done) {
    supertest(app)
      .get("/web2/shop/gib/maxprice")
      .expect(200)                    //expect status 200
      .expect('Content-Type', /json/) //expect to be json 
      .expect(CheckPreisAttribut)
      .end(function(err, res){  // Auswertung wenn alle .expect durchlaufen sind
        if(err){return done(err);}
        else{return done();}
      });
  });
});



describe("Test Shop Route: 'Suche'", function() {
  const suchworte=["halloWelt", "Buch", "suchwort",  "Nix", "Sandmann", "Test", " d3!jd87", "fdsui(DHGGHSHG", "hjsF8dn,2iD18A1"];     

  for(let i=0; i<suchworte.length;i++){

    it("Response soll ein JSON mit eventuellen Treffern beinhalten", function(done) {
      supertest(app)
        .get("/web2/shop/gib/suche/"+suchworte[i])
        .expect(200)                    //expect status 200
        .expect('Content-Type', /json/) //expect to be json 
        .expect(CheckBuchAttribute)
        .end(function(err, res){  // Auswertung wenn alle .expect durchlaufen sind
          if(err){return done(err);}
          else{return done();}
        });
     });
  }
});



function CheckPreisAttribut(res){
  if(res.body.daten==undefined){ throw new Error("'Daten' Key in JSON Response fehlt!"); }
  if(res.body.daten.length>1){ throw new Error(" .Daten ist zu lang!")};
  if(res.body.daten[0].preis==undefined){ throw new Error("Preis ist nicht im JSON enthalten!")}
}



function CheckBuchAttribute(res) {
  if(res.body.daten==undefined){ throw new Error("'Daten' Key in JSON Response fehlt!"); }

  for(let i=0; i<res.body.daten.length;i++){
      if(res.body.daten[i].id==undefined){ throw new Error("id in JSON ist nicht definiert!") }
      if(res.body.daten[i].titel==undefined){ throw new Error("titel in JSON ist nicht definiert!") }
      if(res.body.daten[i].kurzbeschreibung==undefined){ throw new Error("kurzbeschreibung in JSON ist nicht definiert!") }
      if(res.body.daten[i].isbn==undefined){ throw new Error("isbn in JSON ist nicht definiert!") }
      if(res.body.daten[i].preis==undefined){ throw new Error("preis in JSON ist nicht definiert!") }
      if(res.body.daten[i].authorid==undefined){ throw new Error("authorid in JSON ist nicht definiert!") }
      if(res.body.daten[i].anzahlbew==undefined){ throw new Error("anzahlbew in JSON ist nicht definiert!") }      
      if(res.body.daten[i].genreid==undefined){ throw new Error("genreid in JSON ist nicht definiert!") }
      if(res.body.daten[i].bildid==undefined){ throw new Error("bildid in JSON ist nicht definiert!") }
      if(res.body.daten[i].mehrwertsteuerid==undefined){ throw new Error("mehrwertsteuerid in JSON ist nicht definiert!") }
      if(res.body.daten[i].gesamtbewertung==undefined){ throw new Error("gesamtbewertung in JSON ist nicht definiert!") }
      if(res.body.daten[i].bildpfad==undefined){ throw new Error("bildpfad in JSON ist nicht definiert!") }
      if(res.body.daten[i].autor_name==undefined){ throw new Error("autor_name in JSON ist nicht definiert!") }
      if(res.body.daten[i].genre==undefined){ throw new Error("genre in JSON ist nicht definiert!") }
  }

}


// ---------------- AUTOREN Tests ------------------------- //

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
    if(res.body.daten==undefined){ throw new Error("'Daten' Key in JSON Response fehlt!"); }
    for(let i=0; i<res.body.daten;i++){
        if(res.body.daten[i].id==undefined){ throw new Error("id in JSON ist nicht definiert!"); }
        if(res.body.daten[i].name==undefined){ throw new Error("name in JSON ist nicht definiert!"); }
        if(res.body.daten[i].age==undefined){ throw new Error("age in JSON ist nicht definiert!"); }
        if(res.body.daten[i].geboren==undefined){ throw new Error("geboren in JSON ist nicht definiert!"); }
        if(res.body.daten[i].gestorben==undefined){ throw new Error("gestorben in JSON ist nicht definiert!"); }
        if(res.body.daten[i].publikationen==undefined){ throw new Error("publikationen in JSON ist nicht definiert!"); }
        if(res.body.daten[i].bildid==undefined){ throw new Error("bildid in JSON ist nicht definiert!"); }
        if(res.body.daten[i].biografie==undefined){ throw new Error("biografie in JSON ist nicht definiert!"); }
    }
}








const { startsWith } = require('lodash');
const helper = require('../helper.js');




const BuchbildDao = require("../dao/buchbildDao.js");
const AutorDao = require("../dao/autorDao.js");
const BuchgenreDao = require('../dao/buchgenreDao.js');


function loadAdditionalData(json_books, dbConnection) {
    for(var i=0; i<json_books.length; i++){
        // Bildpfad einfügen
        buchbildDao = new BuchbildDao(dbConnection);
        json_books[i]["bildpfad"]=buchbildDao.loadById(json_books[i]["bildid"])["bildpfad"];
        // Autor Name einfügen
        autorDao = new AutorDao(dbConnection);
        json_books[i]["autor_name"]=autorDao.loadById(json_books[i]["authorid"])["name"];
        // Genre einfügen
        buchgenreDao = new BuchgenreDao(dbConnection);
        json_books[i]["genre"]=buchgenreDao.loadById(json_books[i]["genreid"])["bezeichnung"];
    }
}




class ShopDao {
    constructor(dbConnection) {
        this._conn = dbConnection;
    }

    getConnection() {
        return this._conn;
    }


  

    loadAll() {
        var sql = 'SELECT * FROM BUCH';
        var statement = this._conn.prepare(sql);
        var result = statement.all();

        if (helper.isArrayEmpty(result)) 
            return [];
    

        loadAdditionalData(helper.arrayObjectKeysToLower(result),this._conn);
        return result;

    }



    loadSuche(suchwort){
    
        //console.log(suchwort);
        var sql = "SELECT * FROM BUCH WHERE ISBN LIKE '%" + suchwort + "%' OR Titel LIKE '%" + suchwort + "%' OR AuthorID = (SELECT ID FROM Autor WHERE Name LIKE '%" + suchwort + "%')";

        var statement = this._conn.prepare(sql);
        var result = statement.all();

        if (helper.isArrayEmpty(result)) 
            return [];
    
        loadAdditionalData(helper.arrayObjectKeysToLower(result),this._conn);
        return helper.arrayObjectKeysToLower(result);

    }


    loadmaxPreis(){
        var sql = 'SELECT Preis FROM Buch WHERE Preis = (SELECT MAX(Preis) FROM Buch);';
        var statement = this._conn.prepare(sql);
        var result = statement.all();

        if (helper.isArrayEmpty(result)) 
            return [];
    
        
        return helper.arrayObjectKeysToLower(result);
    }



    loadPreis(preis){
    
        
        var sql = "SELECT * FROM BUCH WHERE Preis <= " + parseFloat(preis);

        var statement = this._conn.prepare(sql);
        var result = statement.all();

        if (helper.isArrayEmpty(result)) 
            return [];
    
        loadAdditionalData(helper.arrayObjectKeysToLower(result),this._conn);
        return helper.arrayObjectKeysToLower(result);


    }




    loadRat(rat){
    
        
        var sql = "SELECT * FROM BUCH WHERE CAST(Gesamtbewertung AS INTEGER) == " + rat;

        var statement = this._conn.prepare(sql);
        var result = statement.all();

        if (helper.isArrayEmpty(result)) 
            return [];
    
        loadAdditionalData(helper.arrayObjectKeysToLower(result),this._conn);
        return helper.arrayObjectKeysToLower(result);


    }


    loadKatRat(para){

        

        var all = para.split("x");
        var kats = all[0].split("c");
        var rats = all[1].split("r");
        var preis = all[2];

        var finalrats = [];
        var finalkats = [];
        

        


        for(var i = 0; i<kats.length; i++){
            

            if(kats[i].length == 2 ){

                finalkats.push(parseInt(kats[i]));

                console.log(parseInt(kats[i]));


            }


        }


        
        for(var i = 0; i<rats.length; i++){


            if(rats[i].length == 1 ){

                console.log(parseInt(rats[i]));
                finalrats.push(parseInt(rats[i]));

            }

        }
        
        
        var sql= "SELECT * FROM BUCH WHERE (" ;

        
        for(var i = 0; i<finalkats.length; i++){

            sql += " GenreID = '" + finalkats[i] + "'";

            if(i < finalkats.length - 1){

                sql += " OR "

            }

            


        }

        sql += ") AND ("

        
        for(var i = 0; i<finalrats.length; i++){

            sql += " ROUND(Gesamtbewertung) = " + finalrats[i];

            if(i < finalrats.length - 1){

                sql += " OR "

            }
        }

        sql += ") AND (Preis <= " + parseFloat(preis) + ")";


        
        
        
       

        var statement = this._conn.prepare(sql);
        var result = statement.all();

        if (helper.isArrayEmpty(result)) 
            return [];

        loadAdditionalData(helper.arrayObjectKeysToLower(result),this._conn);
        return helper.arrayObjectKeysToLower(result);


    }







    loadRat(para){

      

        var all = para.split("x");
        
        
        var rats = all[0].split("r");
        var preis = all[1];
        
        var finalrats = [];

        
        for(var i = 0; i<rats.length; i++){


            if(rats[i].length == 1 ){

                console.log(parseInt(rats[i]));
                finalrats.push(parseInt(rats[i]));

            }

        }
        
        
        var sql= "SELECT * FROM BUCH WHERE (" ;

        for(var i = 0; i<finalrats.length; i++){

            sql += " ROUND(Gesamtbewertung) = " + finalrats[i];

            if(i < finalrats.length - 1){

                sql += " OR "

            }


        }

        sql += ") AND (Preis <= " + parseFloat(preis) + ")"; 


        
        
       

        var statement = this._conn.prepare(sql);
        var result = statement.all();

        if (helper.isArrayEmpty(result)) 
            return [];
        
        loadAdditionalData(helper.arrayObjectKeysToLower(result),this._conn);
        return helper.arrayObjectKeysToLower(result);


    }






    loadKat(para){


        console.log(para);


        var all = para.split("x");
        console.log(all);
        
        var kats = all[0].split("c");
        var preis = all[1];
        
        var finalkats = [];

        
        for(var i = 0; i<kats.length; i++){


            if(kats[i].length == 2 ){

                console.log(parseInt(kats[i]));
                finalkats.push(parseInt(kats[i]));

            }

        }
        
        
        var sql= "SELECT * FROM BUCH WHERE (" ;

        

        for(var i = 0; i<finalkats.length; i++){

            sql += " GenreID = '" + finalkats[i] + "'";

            if(i < finalkats.length - 1){

                sql += " OR "

            }

            


        }

        sql += ") AND (Preis <= " + parseFloat(preis) + ")"; 


        
      
        

        var statement = this._conn.prepare(sql);
        var result = statement.all();

        if (helper.isArrayEmpty(result)) 
            return [];
        
        loadAdditionalData(helper.arrayObjectKeysToLower(result),this._conn);
        return helper.arrayObjectKeysToLower(result);

        
    }

}

module.exports = ShopDao;


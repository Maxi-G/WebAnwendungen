const Database = require('better-sqlite3');
const path = require("path");
const dbOptions = { verbose: console.log };
const dbFile = path.join(__dirname, "../db/datenbank.sqlite");     
const dbConnection = new Database(dbFile, dbOptions);




//BETA
const ShopDao  = require('../dao/shopDao');
const { TestWatcher } = require("jest");
const shopDao = new ShopDao(dbConnection);

test('ShopDAO alle Bücher' , () => {
  expect(shopDao.loadSuche("HFD(")).toStrictEqual([]);
})
//BETA
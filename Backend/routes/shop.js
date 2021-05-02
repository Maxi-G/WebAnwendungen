
const helper = require('../helper.js');
const ShopDao = require('../dao/shopDao.js');
const express = require('express');
var serviceRouter = express.Router();

helper.log('- Route Shop');

serviceRouter.get('/shop/gib/all', function(request, response) {
    helper.log("Route Shop: Client requested all records");

    const shopDao = new ShopDao(request.app.locals.dbConnection);
    try {
        var result = shopDao.loadAll();
        helper.log('Route Shop: All records loaded');
        response.status(200).json(helper.jsonMsgOK(result));
    } catch (ex) {
        helper.logError('Service Adresse: Error loading records. Exception occured: ' + ex.message);
        response.status(400).json(helper.jsonMsgError(ex.message));
    }
});

//





module.exports = serviceRouter;
/////////////////
// workaround / bugfix for linux systems
Object.fromEntries = l => l.reduce((a, [k,v]) => ({...a, [k]: v}), {})
/////////////////
const helper = require('./helper.js');
const path = require('path');
const express = require('express');
try {
    
    const fileUpload = require('express-fileupload');
    const cors = require('cors');
    const morgan = require('morgan');
    
    helper.log('Starting server...');

    // connect database
    helper.log('Connect database...');
    const Database = require('better-sqlite3');
    const dbOptions = { verbose: console.log };
    const dbFile = 'Backend/db/datenbank.sqlite';
    helper.log(dbFile);
    const dbConnection = new Database(dbFile, dbOptions);

    helper.log('Creating and configuring Web Server...');
    const app = express();
    
    // provide service router with database connection / store the database connection in global server environment
    app.locals.dbConnection = dbConnection;

    helper.log('Binding middleware...');
    app.use(fileUpload({
        createParentPath: true,
        limits: {
            fileSize: 2 * 1024 * 1024 * 1024        // limit to 2MB
        }
    }));
    app.use(morgan('dev'));
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: false}));
    app.use(express.static(path.join(__dirname, 'Frontend')));
    app.use(function(request, response, next) {
        response.setHeader('Access-Control-Allow-Origin', '*'); 
        response.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
        response.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
        next();
    });
    

    // binding endpoints
    const TOPLEVELPATH = '/web2';
    helper.log('Binding enpoints, top level Path at ' + TOPLEVELPATH);

    var homeRouter = require('./Backend/routes/home');
    app.use('/', homeRouter);
    
    var buchRouter = require('./Backend/routes/buch');
    app.use(TOPLEVELPATH, buchRouter);

    var buchBildRouter = require('./Backend/routes/buchbild.js');
    app.use(TOPLEVELPATH, buchBildRouter);

    zahlungsartRouter = require('./Backend/routes/zahlungsart.js');
    app.use(TOPLEVELPATH, zahlungsartRouter);

    bewertungenRouter = require('./Backend/routes/bewertungen.js');
    app.use(TOPLEVELPATH, bewertungenRouter);
    
    userRouter = require('./Backend/routes/user.js');
    app.use(TOPLEVELPATH, userRouter);

    shopRouter = require('./Backend/routes/shop.js');
    app.use(TOPLEVELPATH, shopRouter);

    autorRouter = require('./Backend/routes/autor.js');
    app.use(TOPLEVELPATH, autorRouter);

    buchgenreRouter = require('./Backend/routes/buchgenre.js');
    app.use(TOPLEVELPATH, buchgenreRouter);
    //---------------------------------------------------------------------------------------//

    // send default error message if no matching endpoint found
    app.use(function (request, response) {
        helper.log('Error occured, 404, resource not found');
        response.status(404).json(helper.jsonMsgError('Resource not found'));
    });


    // starting the Web Server
    helper.log('\nBinding Port and starting Webserver...');
    module.exports = app;

} catch (ex) {
    helper.logError(ex);
}
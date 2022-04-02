
const express = require('express');
const cors = require('cors');
const db = require('../database/db-connection');

class Server {

    constructor(){
        this.app = express();
        this.port = process.env.PORT;

        //Paths
        this.usersPath = '/api/users';
        this.buildingsPath = '/api/buildings';
        this.authPath = '/api/auth';
        this.articlesPath = '/api/articles';
        this.pqrsPath = '/api/pqrs';
        this.clasificadosPath = '/api/clasificados';
        
        //DB Connection
        this.connectToDB();
        
        //Middlewares
        this.middlewares();

        //Routes
        this.routes();


    }

    async connectToDB(){
        await db.dbConnection();
    }

    
    //Middlewares
    middlewares(){
        this.app.use(express.static('public'));
        this.app.use(cors());
        this.app.use(express.json());
    }

    //Routes
    routes(){
        this.app.use( this.usersPath, require('../routes/users.routes'));
        this.app.use( this.buildingsPath, require('../routes/buildings.routes'));
        this.app.use( this.authPath, require('../routes/auth.routes'));
        this.app.use( this.articlesPath, require('../routes/articles.routes'));
        this.app.use( this.pqrsPath, require('../routes/pqrs.routes'));
        this.app.use( this.clasificadosPath, require('../routes/clasificados.routes'));
    }

    //Listen on PORT
    listen() {
        this.app.listen( this.port, ()=> console.log('Server listening on port '+ this.port) );
    }


}


//Exports
module.exports = Server;
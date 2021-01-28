const express = require('express');
const app = express();
const morgan = require('morgan');
const nunjucks = require('nunjucks');
const routes = require('./routes');
const Sequelize = require('sequelize');
const models = require('./models');
const db = require('./db');


app.use(express.static('public'));
app.use(morgan('tiny'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// apuntá nunjucks al directorio conteniendo templates y apagando el cacheo,
// configure devuelve una instancia Enviornment que vamos a querer usar para
// agregar Markdown después.
var env = nunjucks.configure('views', { noCache: true });
// hace res.render funcionar con archivos html
app.set('view engine', 'html');
// cuando res.render funciona con archivos html, haz que use nunjucks para eso.
app.engine('html', nunjucks.render);

app.use('/', routes) // va direecto al index, el cual lo redirecciona a users o a wiki si es necesario

app.use((err, req, res, next)=>{
        res.sendStatus(404);// asi es solo para el status, sino le pones mensajito en el send
});

db.sync()
    .then(function () {
        console.log('db connected!!!')
        // asegurate de reemplazar el nombre de abajo con tu app de express
        app.listen(3000, () => {
            console.log('listening on port 3000');
        });
    })
    .catch(console.error);



//models.db.sync({force: true})
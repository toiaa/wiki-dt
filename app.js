const express = require('express');
const app = express();
const morgan = require('morgan');
const nunjucks = require( 'nunjucks' );
const routes = require('./routes');

app.use(express.static('public'));
app.use(morgan('tiny'));

app.use(express.json());
//app.use(express.urlEncoded({extended: true}));

// apuntá nunjucks al directorio conteniendo templates y apagando el cacheo,
// configure devuelve una instancia Enviornment que vamos a querer usar para
// agregar Markdown después.
var env = nunjucks.configure('views', {noCache: true});
// hace res.render funcionar con archivos html
app.set('view engine', 'html');
// cuando res.render funciona con archivos html, haz que use nunjucks para eso.
app.engine('html', nunjucks.render);


app.use('/', routes)

app.listen(3000, ()=>{
    console.log('listening on port 3000');
});
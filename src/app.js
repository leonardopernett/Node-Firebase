const express = require('express');
const morgan = require('morgan')
const hbs   = require('express-handlebars')
const path = require('path');
const app = express();

//setitong
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname,'views'));
app.engine('.hbs', hbs({
    defaultLayout:'main',
    layoutsDir:path.join(app.get('views'), 'layouts'),
    extname:'.hbs'
}))

app.set('view engine', '.hbs')

//middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended:false}))

//router
app.use(require('./router/index.js'))

//static
app.use(express.static(path.join(__dirname, 'public')))


module.exports= app
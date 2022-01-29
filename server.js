const express = require('express');
const { get } = require('express/lib/response');
const res = require('express/lib/response');
const methodOverride = require('method-override');
const mongoose = require('mongoose');


//CONFIG
require('dotenv').config();
const PORT = process.env.PORT;
const app = express();
mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true,
    useUnifiedTopology: true}, () => {
        console.log('connected to mongo: ', process.env.MONGO_URI)
    })

//MIDDLEWARE || Before the clients request hit the path. It gets intercepted through middleware and does this process.
app.use(methodOverride('_method'))
app.set('views', __dirname + '/views') //defining which folder were putting the view files inside

app.set('view engine', 'jsx') //setting the view engine ((jsx))

app.engine('jsx', require('express-react-views').createEngine()); //intializing the jsx

//adding CSS
app.use(express.static('public'))

//urlencoded
app.use(express.urlencoded({extended: true}))
//ROUTES
app.get('/', (req, res) => {
    res.send('Welcome to an Awesome App about Breads!');
})

//BREADS
const breadsController = require('./controllers/breads_controller');
app.use('/breads', breadsController);

//Bakers
const bakersController = require('./controllers/bakers_controller');
app.use('/bakers', bakersController)

//404 Page
app.get('*', (req, res) => {
    res.render('error404')
})

//LISTEN
app.listen(PORT, () => {
    console.log('eating bread on PORT', PORT);
})
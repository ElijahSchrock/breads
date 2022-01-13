const express = require('express');
const res = require('express/lib/response');

//CONFIG
require('dotenv').config();
const PORT = process.env.PORT;
const app = express();

//ROUTES
app.get('/', (req, res) => {
    res.send('Welcome to an Awesome App about Breads!');
})

//BREADS
const breadsController = require('./controllers/breads_controller');
app.use('/breads', breadsController);

//LISTEN
app.listen(PORT, () => {
    console.log('eating bread on PORT', PORT);
})
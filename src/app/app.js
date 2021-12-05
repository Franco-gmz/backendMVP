const express =  require('express');
const router = require('../routes/router');
const cors = require('cors')

//Initialization
const app = express();

//Settings 
app.set('port', process.env.PORT || 4000);
app.use(cors());

//Middlewares
app.use(express.json());
app.use(express.urlencoded({extended:false}));

//Routes
app.use('/api',router);

//Starting server
app.listen(app.get('port'), () => { console.log('Server is listening on port ', app.get('port'))});

module.exports = app;
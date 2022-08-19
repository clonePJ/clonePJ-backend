const express = require('express');
// const { sequelize } = require('./models');
// const cors = require('cors');
const morgan = require('morgan');

const app = express();
const port = 3000;

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const router = require('./layers/routers');
app.use('/api', router);

app.listen(port, () => {
    console.log('아악 열렸따ㅏㅏ아@!');
});

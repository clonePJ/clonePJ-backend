const express = require('express');
const app = express();
const port = 3000;

const morgan = require('morgan');
app.use(morgan('dev'));

const cors = require('cors');
const whitelist = ['0', 'http://localhost:3000'];
const corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1) {
            console.log('허가:', origin);
            callback(null, true);
        } else {
            console.log('불허가', origin);
            callback(new Error('Not Allowed Origin!'));
        }
    },
};
app.use(cors(corsOptions));
// const sequelize = require('sequelize');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const router = require('./layers/routers');
app.use('/api', router);

const test = require('./layers/test.router');
app.use('/test', test);

const { sequelize } = require('./models');
sequelize
    .sync({ force: false })
    .then(() => {
        console.log('db connect success');
    })
    .catch((err) => {
        console.error(err);
    });

app.listen(port, () => {
    console.log('아악 열렸따ㅏㅏ아@! 포트 번호는~!!~' + port + '번 입니다~!');
});

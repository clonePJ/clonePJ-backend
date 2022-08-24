const express = require('express');
const app = express();
const port = 3000;

const morgan = require('morgan');

// const myMorgan = morgan('dev', {skip: function (req, res) {
//     return res.statusCode == 304;
// }});
// app.use(myMorgan);

app.use(morgan('dev'));

const cors = require('cors');
const whitelist = [
    '0',
    'http://localhost:3000',
    'http://disbord-clone.s3-website.ap-northeast-2.amazonaws.com',
];
const corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            console.log('불허가', origin);
            callback(new Error('Not Allowed Origin!'));
        }
    },
};
app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const router = require('./layers/routers');
app.use('/api', router);

// const test = require('./layers/test.router');
// app.use('/test', test);

// const { sequelize } = require('./models');
// sequelize.sync({ force: false });

app.listen(port, () => {
    console.log('아악 열렸따ㅏㅏ아@! 포트 번호는~!!~' + port + '번 입니다~!');
});

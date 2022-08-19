const express = require('express');
const app = express();

const whitelist = ['http://'];
const cors = require('cors');
const corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexof(origin !== -1)) {
            callback(null, true);
        } else {
            console.log(origin);
            callback(new Error('Origin으로 진입하지 않았습니다.'));
        }
    },
};
app.use(cors());

// const { sequelize } = require('./models');

const morgan = require('morgan');
app.use(morgan('dev'));

const http = require('http').Server(app);
const socketio = require('socket.io');
const io = socketio.listen(http);

const port = 3000;

http.listen(port, () => {
    console.log('아악 열렸따ㅏㅏ아@! 포트 번호는~!!~' + port + '번 입니다~!');
});

app.get();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const router = require('./layers/routers');
app.use('/api', router);

app.listen(port, () => {});

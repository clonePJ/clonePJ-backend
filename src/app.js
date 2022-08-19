const express = require('express');
const app = express();
const port = 3000;

// const { sequelize } = require('./sequelize/models');
// sequelize.sync({ force: true });

const morgan = require('morgan');
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const router = require('./layers/routers');
app.use('/api', router);

app.listen(port, () => {
    console.log('아악 열렸따ㅏㅏ아@! 포트 번호는~!!~' + port + '번 입니다~!');
});

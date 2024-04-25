require('dotenv').config();

const express = require('express');
const app = express();
const router = require('./routers');
const { sequelize } = require('./models');
const port = process.env.PORT || 3000;

app.use(express.urlencoded({extended: false}));
app.use(express.json());

delete require.cache[require.resolve('./models')];

app.use(router);

app.listen(port, () => {
    console.log(`Blood Nation app listening on port ${port}`)
});
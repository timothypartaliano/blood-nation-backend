require('dotenv').config();

const express = require('express');
const app = express();
const router = require('./routers');
const port = process.env.PORT || 3000;
const fs = require('fs');
const configFilePath = './config/config.json';

const config = require(configFilePath);

if (config.development) {
    config.development.username = process.env.DB_USERNAME;
    config.development.password = process.env.DB_PASSWORD;
    config.development.database = process.env.DB_DATABASE;
    config.development.host = process.env.DB_HOST;
}

fs.writeFile(configFilePath, JSON.stringify(config, null, 2), (err) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log('Updated config.json with environment variables');
});

app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use(router);

app.listen(port, () => {
    console.log(`Blood Nation app listening on port ${port}`)
})
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const express = require('express');
const cors = require('cors');
const app = express();
const router = require('./routers');
const port = process.env.PORT || 3000;

app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use(cors());

app.use(router);

app.listen(port, () => {
    console.log(`Blood Nation app listening on port ${port}`)
});
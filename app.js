const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
    res.send('Welcome to Blood Nation API!')
})

app.listen(port, () => {
    console.log(`BloodNation app listening on port ${port}`)
})
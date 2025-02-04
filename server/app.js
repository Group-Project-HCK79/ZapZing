const express = require('express')
const app = express()
const cors = require('cors')


app.use(cors())

app.get('/', (req, res) => {
    res.send(' INI GAME ZAPZING')
})

app.listen(3000, () => {
    console.log('INI GAME ZapZing http://localhost:3000');

})

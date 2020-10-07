const express = require('express');
const dictionaryRoutes = require('./routes/dictionary');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.use(cors());

const PORT = process.env.PORT || 3000;


app.use(bodyParser.json());
app.use("/", dictionaryRoutes);

app.listen(PORT, () => {
    console.log(`Dictionary app listening at http://localhost:${PORT}`)
})
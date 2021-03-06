const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const app = express();

const api = require('./server/routes/api');
   
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

function errorHandler(err, req, res, next) {
  res.status(500).send({ error: err });
  res.render('error', { error: err });
}
app.use(errorHandler);

app.use(express.static(path.join(__dirname, 'dist')));

app.use('/api', api);


const port = process.env.PORT || '3000';
app.set('port', port);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
});

const server = http.createServer(app);

server.listen(port, () => console.log(`API running on localhost:${port}`));


const express = require('express');
const request = require('request');

const app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.get('/getrequest', (req, res) => {
  request(
    { url: 'https://api.domainsdb.info/v1/domains/search?domain=facebook&zone=com' },
    (error, response, body) => {
      if (error || response.statusCode !== 200) {
        return res.status(500).json({ type: 'error', message: err.message });
      }

      res.json(JSON.parse(body));
    }
  )
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`listening on ${PORT}`));
// Start the server on port 3000
//app.listen(3000, '127.0.0.1');
//console.log('Node server running on port 3000');
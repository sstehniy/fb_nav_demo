const express = require('express');
const path = require('path');
const app = express();

const port = process.env.PORT || 5000;

app.use(express.static('build'));

app.get('/*', (_, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'), (err) => {
    if (err) console.log(err);
  });
});

app.listen(port, (err) => {
  if (err) console.log(err);
  else console.log(`app running on port ${port}`);
});

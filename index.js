import express from 'express';
const app = express();

app.use(express.static('build'));

app.listen(process.env.PORT || 5000, (err) => {
  if (err) console.log(err);
});

import express from 'express';
import { create, read, remove } from './database';
import bodyParser from 'body-parser';

const site = 'global.adsbexchange.com';

const app = (express.application = express());

// body parsing middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/icao', async (req, res) => {
  const icaoRows = await read(req.body.icao);
  const icaos: Array<string> = icaoRows.map((icaoRow) => icaoRow.icao);
  res.redirect(`https://${site}/?icao=${icaos.join(',')}`);
});

app.post('/icao', async (req, res) => {
  const success = await create(req.body.icao);
  if (success) {
    res.status(201).send();
  } else {
    res.status(400).send();
  }
});

app.delete('/icao', async (req, res) => {
  const success = await remove(req.body.icao);
  if (success) {
    res.status(204).send();
  } else {
    res.status(400).send();
  }
});

app.listen(3000, () => {
  console.log('starting app on 3000');
});

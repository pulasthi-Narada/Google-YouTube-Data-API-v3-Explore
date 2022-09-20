import * as dotenv from 'dotenv';
import express from 'express';
import axios from 'axios';
import youTubeApi from './youTubeApi.js';

dotenv.config();

const app = express();

app.use(youTubeApi);

app.get('/', function (req, res) {
  res.send('Explore The Google YouTube Data API v3');
});

// Redirect to Google's OAuth 2.0 server
app.get('/authorization', (req, res) => {
  res.redirect(
    `https://accounts.google.com/o/oauth2/v2/auth?client_id=${process.env.client_id}&access_type=offline&redirect_uri=${process.env.redirect_uri}&response_type=code&scope=${process.env.scope}`,
  );
});

//
app.get('/after', async (req, res) => {
  if (req.query.code) {
    const authorizationCode = req.query.code;

    try {
      const { data } = await axios.post(
        'https://oauth2.googleapis.com/token',
        null,
        {
          params: {
            client_id: process.env.client_id,
            client_secret: process.env.client_secret,
            code: authorizationCode,
            grant_type: 'authorization_code',
            redirect_uri: process.env.redirect_uri,
          },
        },
      );

      res.json(data);
    } catch (e) {
      res.send(e);
    }
  }
});

app.listen(3000 || process.env.PORT);

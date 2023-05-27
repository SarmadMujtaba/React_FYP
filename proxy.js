const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
app.use(cors());

app.get('/jobs', async (req, res) => {

    const org_id = req.query.org_id;
      let url = 'https://59ec-119-73-100-124.ngrok-free.app/jobs';
      if (org_id) {
        url += `?org_id=${org_id}`;
      }

  try {
    const response = await fetch(url, {
  
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Something went wrong');
  }
});

app.get('/application', async (req, res) => {
    const id = req.query.user_id;
    const job_id = req.query.job_id;
  
    try {
      if (id !== null && id !== undefined) {
        const response = await fetch(`https://59ec-119-73-100-124.ngrok-free.app/application?user_id=${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json();
        res.json(data);
      } else if (job_id !== null && job_id !== undefined) {
        const response = await fetch(`https://59ec-119-73-100-124.ngrok-free.app/application?job_id=${job_id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json();
        res.json(data);
      } else {
        res.status(400).send('Invalid request');
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('Something went wrong');
    }
  });
  

  app.get('/profile', async (req, res) => {
    const id = req.query.user_id;
    try {
      const response = await fetch(`https://59ec-119-73-100-124.ngrok-free.app/profile?user_id=${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      res.json(data);
    } catch (error) {
      console.error(error);
      res.status(500).send('Something went wrong');
    }
  });

  app.get('/organizations/profile', async (req, res) => {
    const id = req.query.id;
    try {
      const response = await fetch(`https://59ec-119-73-100-124.ngrok-free.app/organizations/profile?id=${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      res.json(data);
    } catch (error) {
      console.error(error);
      res.status(500).send('Something went wrong');
    }
  });

const port = 3000;
app.listen(port, () => {
  console.log(`Proxy API listening at http://localhost:${port}`);
});

const express = require('express');
const path = require('path');
const db = require('../database/index.js');
const morgan = require('morgan');

const app = express();
const PORT = 3000;

app.use(morgan('dev'));
app.use(express.static('public'));

app.get('/api/users/:name', async (req, res) => {
  const { name } = req.params;

  console.log(`The name is: ${name}`);

  try {
    const user = await db.query(`FOR a IN users FILTER a.firstName == '${name}' RETURN a`);
    const result = await user.all();
    res.send(result);
  } catch (err) {
    console.log(`Error: ${err}`);
    res.sendStatus(500);
  }
})

app.get('/api/vehicles/:vehicleName', async (req, res) => {
  const { vehicleName } = req.params;

  console.log('The vehicle is:');
  console.log(vehicleName);
  
  try {
    const vehicle = await db.query(`FOR a IN vehicles FILTER a.name == "${vehicleName}" RETURN a`);
    const result = await vehicle.all();
    res.send(result);
  } catch (err) {
    console.log(`Error: ${err}`);
    res.sendStatus(500);
  }
  
})

app.post('/api/odometer', async (req, res) => {
  const { miles, vehicle } = req.query;

  try {
    const updater = await db.query(`FOR a IN vehicles FILTER a.name == "${vehicle}" UPDATE a WITH { odometer: ${miles} } IN vehicles`);
    const results = await updater.all();
    res.sendStatus(200);
  } catch (err) {
    console.log(`Error: ${err}`);
    res.sendStatus(500);
  }

})

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});

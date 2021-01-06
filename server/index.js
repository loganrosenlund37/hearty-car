const express = require('express');
const path = require('path');
const db = require('../database/index.js');
const morgan = require('morgan');
const mileageUpdater = require('./averageMileageUpdater.js');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(express.static('public'));

app.get('/api/users/:name', async (req, res) => {
  const { name } = req.params;

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
    db.query(`FOR a IN vehicles FILTER a.name == "${vehicle}" UPDATE a WITH { odometer: ${miles} } IN vehicles`);
    // const results = await updater.all();
    res.sendStatus(200);
  } catch (err) {
    console.log(`Error: ${err}`);
    res.sendStatus(500);
  }
})

app.get('/api/mileage/:vid', async (req, res) => {
  const { vid } = req.params;

  try {
    const response = await db.query(`FOR a IN mileage${vid} RETURN a`);
    const results = await response.all();
    res.send(results);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
})

app.post('/api/mileage', async (req, res) => {
  const { date, mpg, gallons, cost, odometer, money, fuel, sumMpg, counter, vid, grandTotal, newAverage } = req.query;

  // let newAverage = Number(grandTotal) / Number(counter);

  try {
    // update database with vehicles new odometer
    db.query(`FOR a IN mileage${vid} UPDATE a WITH { average: {
      "average": ${newAverage},
      "totalMoney": ${money},
      "totalFuel": "${fuel}",
      "grandTotal": "${sumMpg}",
      "counter": ${counter},
      "lastFillup": ${odometer},
    },
    fillups: UNSHIFT(a.fillups, {
      "date": "${date}",
      "mpg": ${mpg},
      "gallons": ${gallons},
      "total": ${cost},
    })
    } IN mileage${vid}`);
    db.query(`FOR a IN vehicles FILTER a.vid == ${vid} UPDATE a WITH { odometer: ${odometer} } IN vehicles`)
    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
  

  // res.sendStatus(200);
})

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});

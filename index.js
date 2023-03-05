const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require("dotenv");
const path = require('path');
const compression = require('compression');
const cors = require('cors');
dotenv.config();
app.use(express.json());
app.use(cors());
app.use(compression());

mongoose.connect(process.env.MONGO_URI, {
  UseNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Cohomy DB connected'))
.catch(err => {
  console.log(err);
})

app.listen(process.env.PORT || 5000, () => {
  console.log(`Cohomy server running` );
})
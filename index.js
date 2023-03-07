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

const authRoute = require('./routes/auth');
const indexRoute = require('./routes/index');

// redirect to secure https:
app.use((req, res, next) => {
  if (req.header('x-forwarded-proto') !== 'https') {
    res.redirect(`https://${req.header('host')}${req.url}`)
  } else {
    next();
  }
});

// redirect to main domain
// app.use((req, res, next) => {
//   if (req.hostname == 'cohomy.herokuapp.com') {
//     res.redirect(`https://cohomy.com${req.url}`)
//   } else {
//     next();
//   }
// });

app.use('/api/auth', authRoute);
app.use('/api/index', indexRoute);

mongoose.connect(process.env.MONGO_URI, {
  UseNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Cohomy DB connected'))
.catch(err => {
  console.log(err);
})

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  })
}

app.listen(process.env.PORT || 5000, () => {
  console.log(`Cohomy server running` );
})
require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const homepageRouter = require("./routes/homepage");
const ordersRouter = require("./routes/orders");
const port = process.env.PORT;
const uri = process.env.MONGO_URI;
const app = express();

try {
  mongoose.connect(uri);
  console.log('connected to mongoDB')
} catch(err) {
  console.log(err)
}

app.use(cors());

app.use("/", homepageRouter);
app.use("/orders", ordersRouter);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const homepageRouter = require("./routes/homepage");
const ordersRouter = require("./routes/orders");
const loginRouter = require("./routes/login");
const registerRouter = require("./routes/register");
const productsRouter = require("./routes/products");
const settingsRouter = require("./routes/settings");
const invoicesRouter = require("./routes/invoices")
const userRouter = require("./routes/user");
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

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

app.use("/", homepageRouter);
app.use("/orders", ordersRouter);
app.use("/login", loginRouter);
app.use("/register", registerRouter);
app.use("/products", productsRouter);
app.use("/settings", settingsRouter);
app.use("/invoices", invoicesRouter);
app.use("/user", userRouter);
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

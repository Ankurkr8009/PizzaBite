const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const a="production"

const connectDB = require("./config/config");
require("colors");
const morgan = require("morgan");

//config dotenv
 dotenv.config();

//connection mongodb
connectDB();

const app = express();

//middlewares
app.use(express.json());
app.use(morgan("dev")); 

//route
app.use("/api/pizzas", require("./routes/pizzaRoute"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/orders", require("./routes/orderRoute"));

if (a === "production") {
  app.use(express.static(path.join(__dirname, "/client/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("<h1>Hello From Node Server vai nodemon</h1>");
  });
}

const port =  8080;
app.listen(port, () => {
  console.log(
    `Server Running On production mode on port no 8080`
      
  );
});

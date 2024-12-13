const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const orderRoutes = require("./routes/orderRoutes");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/orders", orderRoutes);

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Conectado a MongoDB");
    app.listen(process.env.PORT, () => console.log(`Order Service corriendo en puerto ${process.env.PORT}`));
  })
  .catch((error) => console.error("Error al conectar a MongoDB:", error));

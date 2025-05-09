const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { PORT, NODE_ENV } = require("./constants/env");
const connectToDatabase = require("./config/db");
const signinRoute = require("./routes/login.route");
const emailRoute = require("./routes/emails.route");

const app = express();

app.use(express.json({ limit: '50mb' })); 
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cors());

// Enable preflight requests for all routes
app.options('*', cors());


app.use("/api/login", signinRoute);
app.use("/api/email", emailRoute);
app.post("/webhook", (req, res) => {
  console.log("Webhook received:", req.body);
  
  if (req.body.value && req.body.value.length > 0) {
      req.body.value.forEach((notification) => {
          console.log("New email received for:", notification.resource);
      });
  }

  res.status(202).send(); // Acknowledge receipt
});

app.listen(PORT, async () => {
  console.log(`Server listening on port ${PORT} in ${NODE_ENV} environment`);
  await connectToDatabase();
});

const mongoose = require("mongoose")
const url = process.env.DBURI;
  
mongoose.connect(url).then((ans) => {
  console.log("Connected to db")
}).catch((err) => {
  console.log("Error in the DB Connection", err);
});
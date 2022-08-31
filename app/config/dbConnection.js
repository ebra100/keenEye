const mongoose = require("mongoose");

mongoose.connect('mongodb://localhost:27017/keenEye').then(() => console.log("db connected")).catch((err) => console.log(err));

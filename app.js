// const express =require('express');
// const  mongoose = require('mongoose');
// const path= require('path');
// const bodyParser = require('body-parser');
// const dotenv = require('dotenv');
// const authRoutes =require('./routes/auth');

// const { protect, authorize } = require("./middleware/auth");
// // app.use(express.static(path.join(__dirname, "public")));

// dotenv.config();



// mongoose.connect('mongodb+srv://kajalchauhan:8365@cluster0.ckv9vgz.mongodb.net/roleAuthDB?retryWrites=true&w=majority/'
// , {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// }).then(() => console.log("MongoDB connected"))
//   .catch(err => console.log(err));


// const app =express()


// // Routes
// app.use("/api", authRoutes);

// app.get("/admin-data", protect, authorize("admin"), (req, res) => {
//     res.send("Admin Only Data");
// });

// app.get("/qa-data", protect, authorize("qa"), (req, res) => {
//     res.send("QA Only Data");
// });


// app.use('/', (req,res)=>{
//    res.send("my server is running");
// })







// const PORT =process.env.PORT|| 4000;


// app.listen(PORT,()=> console.log(`server is running on http://localhost:${PORT}`));









require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const authRoutes = require("./routes/auth");
const { protect, authorize } = require("./middlewares/auth");
const user = require("./models/user");

const app = express();
app.use(express.json());


mongoose.connect('mongodb+srv://kajalchauhan8365:kajal@cluster0.n7vjp.mongodb.net/roleAuthDB?retryWrites=true&w=majority&appName=Cluster0'
, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));


// Routes
app.use("/api", authRoutes);

app.get("/login", async (req, res) => {
    const users = await user.find();
    
    res.json(users);
});


app.get("/admin-data", protect, authorize("admin"), (req, res) => {
    res.send("Admin Only Data");
});

app.get("/qa-data", protect, authorize("qa"), (req, res) => {
    res.send("QA Only Data");
});

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});

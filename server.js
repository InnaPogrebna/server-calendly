require("dotenv").config();
const express = require("express");

const jwt = require("jsonwebtoken");
const cors = require("cors");
const app = express();
const path = require('path');


const host = process.env.host;
const port = process.env.port;
const authRoute = require('./routes/api/auth');
const userRoute = require('./routes/api/users');
const employeesRoute = require('./routes/api/employees');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) =>{
  console.log('req', req.headers.authorization);
  if (typeof req.headers.authorization !== "undefined"){
    let token = req.headers.authorization.split(' ')[1]
    let data = false;
    try {
      data = jwt.verify(token, process.env.JWT_KEY);
    } catch(e) {}
    // console.log('data',data);
      req.userInfo = false
    if(data){
      req.userInfo = data;
    }
  }
  next();
})

app.get('/', (req, res) => {
  res.send('Server works');
})
app.use('/api/auth', authRoute);
app.use('/api/user', userRoute);
app.use('/api/employees', employeesRoute);
// app.post("/api/auth/register", (req, res) => {
//   const { newUsername, newPassword } = req.body;
//   //res.send(newPassword, newUsername)
//   console.log('request info -',newPassword, newUsername)
//   if (newPassword !== "" && newUsername !== "") {
//     res.status(200);
//     res.json({
//       //user,
//     });
//   }
// });

// app.post("/api/auth/login", (req, res) => {
//   const USERNAME = '11';
//   const PASSWORD = '11';
//   const { username, password } = req.body;
//   if (username === USERNAME && password === PASSWORD) {
//     const user = {
//       username: USERNAME,
//       password: PASSWORD,
//     };
//     const token = jwt.sign(user, process.env.JWT_KEY);
//     res.status(200);
//     res.json({
//       token,
//       user,
//     });
//   } else {
//     res.status(403);
//     res.json({
//       message: "wrong",
//     });
//   }
// });

app.listen(port, host, function () {
  console.log(`Server listen http://${host}:${port}`)
})

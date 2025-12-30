//npm i express ejs mongoose jsonwebtoken bcrypt cookie cookie-parser

const express = require('express');
const app = express();
const path = require('path');
const userModel = require('./models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


app.get('/', async (req, res) => {
     let token = req.cookies.token;

     if (token) {
          let data = jwt.verify(token, 'Dnnnnnn');
          let user = await userModel.findOne({ email: data.email });
          res.render('index', { user: user });
     } else {
          res.render('index', { user: null });
     }
});


app.get('/login', (req, res) => {
     res.render('login');
});


app.get('/logout', (req, res) => {
     res.cookie('token', "");
     res.redirect('/');
});

app.post('/register', async (req, res) => {
     let { name, username, email, password } = req.body;

     let user = await userModel.findOne({ email: email });

     if (user) { res.send('This user already exist'); }

     bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(password, salt, async (err, hash) => {
               let createdUser = await userModel.create({
                    name, username, email,
                    password: hash
               });

               let token = jwt.sign({ email: email }, 'Dnnnnnn');
               res.cookie('token', token);
               res.redirect('/');
          });
     });
});


app.post('/login', async (req, res) => {
     let { email, password } = req.body;

     let user = await userModel.findOne({ email: email });

     if (user) {
          bcrypt.compare(password, user.password, (err, result) => {
               if (result) {
                    let token = jwt.sign({ email: email }, 'Dnnnnnn');
                    res.cookie('token', token);
                    res.redirect('/');
               } else {
                    res.send('incorrect password');
               }
          });
     } else {
          res.send('incorrect email');
     }
});


app.listen(3000);
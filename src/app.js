import express from 'express';
import http from 'http';
import socketIO from 'socket.io';
import exphbs from 'express-handlebars';
import path from 'path';
import session from 'express-session';
import authRouter from './routes/auth';
import CartManager from './dao/models/mongoDB/CartManager';
import ProductManager from './dao/models/mongoDB/ProductManager';
import viewsRouter from './routes/views';
import { initPassport } from './config/passport.config';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import { authenticateUser } from './config/passport.config';
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const exphbs = require('express-handlebars');
const path = require('path');
const ChatManager = require('./ChatManager'); 
const ProductManager = require('./ProductManager');
const viewsRouter = require('./routes/views');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);
const port = 3000;

const cartManager = new CartManager();
const productManager = new ProductManager();
const chatManager = new ChatManager(); 

const productManager = new ProductManager('productos.json');
>>>>>>> 54ddeae2fcd28345467c0fdbdd40256b62bd3858

app.engine('handlebars', exphbs());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars');

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: 'supersecreto',
    resave: false,
    saveUninitialized: true
}));
initPassport(passport);
app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', authRouter);

app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        authenticateUser(email, password, (err, user) => {
            if (err || !user) {
                return res.status(401).json({ message: 'Usuario no autorizado' });
            }
            const accessToken = jwt.sign({ id: user.id, email: user.email }, 'clave', { expiresIn: '1m' });
            res.json({ accessToken: accessToken });
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/products', async (req, res) => {
  try {
    const limit = req.query.limit ? parseInt(req.query.limit, 10) : undefined;
    const products = await productManager.getProducts(limit);
    res.json({ products });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/products/:pid', async (req, res) => {
  const productId = parseInt(req.params.pid, 10);
  try {
    const product = await productManager.getProductById(productId);
    res.json({ product });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
>>>>>>> 54ddeae2fcd28345467c0fdbdd40256b62bd3858
});

app.use('/', viewsRouter);

io.on('connection', (socket) => {
    console.log('Cliente conectado');

    socket.on('chatMessage', (message) => {
    });

    socket.on('disconnect', () => {
        console.log('Cliente desconectado');
    });
});

server.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
  console.log('Cliente conectado');


  socket.on('chatMessage', (message) => {
    chatManager.addMessage(message);
    io.emit('chatMessage', message);
  });

  socket.on('disconnect', () => {
    console.log('Cliente desconectado');
  });
});

server.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
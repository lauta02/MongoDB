const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const exphbs = require('express-handlebars');
const path = require('path');
const session = require('express-session');
const authRouter = require('./routes/auth');
const CartManager = require('./dao/models/mongoDB/CartManager'); 
const ProductManager = require('./dao/models/mongoDB/ProductManager'); 
const viewsRouter = require('./routes/views');
const { initPassport } = require('./config/passport.config');
const passport = require('passport');
const { router: sessionsRouter } = require('./routes/sessions');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);
const port = 3000;

const cartManager = new CartManager(); 
const productManager = new ProductManager(); 

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
app.use('/sessions', sessionsRouter);

app.use('/products', productsRouter); 
app.use('/cart', cartRouter); 

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
});
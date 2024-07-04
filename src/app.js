const express = require('express');
const objectConfig = require('./config/objectConfig');
const { addLogger, logger } = require('./config/logger');
const cors = require('cors');

const { Server } = require('socket.io');
const socketProduct = require('./utils/socketProducts');
const socketChat = require('./utils/socketChat');

const mainRouter = require('./routes/index');

const handlebars = require('express-handlebars');

const passport = require('passport');
const { initPassport, initPassportGithub } = require('./config/passport.config.js');
const cookieParser = require('cookie-parser');

const app = express();
app.use(addLogger);

const PORT = process.env.PORT || 3000; 
const httpServer = app.listen(PORT, () => {
    logger.info('Servidor en ejecución en el puerto: ' + PORT);
});

const hbs = handlebars.create({
    extname: '.handlebars', 
    defaultLayout: 'main', 
    layoutsDir: __dirname + '/views/layouts', 
    partialsDir: __dirname + '/views/partials', 
    runtimeOptions: {
        allowProtoPropertiesByDefault: true
    }
});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', __dirname + '/views');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/static', express.static(__dirname + '/public'));
app.use(cookieParser());
app.use(cors({
    origin: ['http://localhost:3333'],
    credentials: true
}));

initPassport();
initPassportGithub();
app.use(passport.initialize());

app.use(mainRouter);

const io = new Server(httpServer);
socketProduct(io);
socketChat(io);
const mongoose = require('mongoose');

const uri = 'mongodb+srv://Lauta02:<password>@cluster0.hkth7ha.mongodb.net/';

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Conexión exitosa a MongoDB'))
.catch(err => console.error('Error de conexión a MongoDB:', err));

module.exports = mongoose;
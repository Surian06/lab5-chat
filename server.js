// npm install para descargar los paquetes...

// librerías
var validation = require('./una-lib/validarMensaje');  // <- usa tu carpeta una-lib
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;

// root: presentar html
app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

// escuchar una conexión por socket
io.on('connection', function(socket){
  // si se escucha "Evento-Mensaje-Server"
  socket.on('Evento-Mensaje-Server', function(msg){
    try {
      // Convertir el string JSON a objeto
      let msgObj = JSON.parse(msg);

      // Validar solo el campo mensaje
      msgObj.mensaje = validation.validateMessage(msgObj.mensaje);

      // Reemitir como JSON string para el cliente
      io.emit('Evento-Mensaje-Server', JSON.stringify(msgObj));
    } catch (err) {
      console.error("Error procesando mensaje:", err);
    }
  });
});

http.listen(port, function(){
  console.log('listening on *:' + port);
});

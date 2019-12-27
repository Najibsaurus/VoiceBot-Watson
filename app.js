
const dotenv = require('dotenv');
const express = require('express');
const morgan = require('morgan');
const colors = require('colors');
var watson = require('./util/watson');

//Route files
const index = require('./routes/index');
const app = express();
dotenv.config({ path: './config/config.env' });


//Mount the router
app.use('/api/v1', index);

app.use('/', express.static('public'));

const PORT = process.env.PORT;
const server = app.listen(
  PORT,
  console.log(
    `Server running on port ${PORT}`.yellow
  )
);

//Handel unhandled promise rejections
process.on('unhandledRejection', (err, Promise) => {
  console.log(`Error  ${err.message}`.red);
  //close server & exit process
  server.close(() => process.exit(1));
});

var io = require('socket.io')(server);
var ss = require('socket.io-stream');
io.on('connection', function(socket) {
  console.log('Connected');

  var context = {};
  socket.on('sendmsg', function(data) {
    watson.message(data.message, context, function(err, res) {
      if (!err) {
        //console.log(res);
        context = res.result.context;
        console.log(res.result.output);

        if (Array.isArray(res.result.output.text))
          conversation_response = res.result.output.text[0];
        //.join(' ').trim();
        else conversation_response = undefined;
        if (conversation_response) {
          var payload = {
            user: 'System',
            message: conversation_response,
            ts: new Date().getTime(),
            type: data.type || 'text'
          };
          socket.emit('replymsg', payload);
        }
      }
    });
  });

  ss(socket).on('recognize', function(stream, data) {
    watson.recognize(
      stream,
      function(err) {
        console.log('Error:', err);
      },
      function(res) {
        var transcript = res;
        socket.emit('transcript', { message: transcript, ts: data.ts });
        console.log(JSON.stringify(res, null, 2));
      }
    );
  });
});

const NET = require('net');

/**
 * A helper function to check a given port is available or not
 * @param {number} port
 * @return {Promise<*>}
 */
exports.isPortOpen = function(port) {
  const server = NET.createServer();
  return new Promise(function(resolve, reject) {
    server.once('error', function(err) {
      err.code === 'EADDRINUSE' ? resolve(true) : reject(err);
    });
    server
      .once('listening', function() {
        server
          .once('close', function() {
            resolve(false);
          })
          .close();
      })
      .listen(port);
  });
};

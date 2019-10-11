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

/**
 * Check node version for allowing to enter to the application
 *
 * @param {string} version
 */
exports.checkNodeVersion = function(version) {
  const currentNodeVersion = process.versions.node;
  const supportedSemver = version.split('.');
  const currentSemver = currentNodeVersion.split('.');

  if (
    currentSemver[0] < supportedSemver[0] ||
    (currentSemver[0] === supportedSemver[0] &&
      currentSemver[1] < supportedSemver[1])
  ) {
    console.error(
      `You are running Node ${currentNodeVersion}. Please update your version of node to ${version} or higher to continue.`
    );
    process.exit(1);
  }
};

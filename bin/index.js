#!/usr/bin/env node
const helpers = require('./helpers');
const fs = require('fs');
const ora = require('ora');
const path = require('path');
const https = require('https');
const httpProxy = require('http-proxy');

const spinner = ora().start();
spinner.start('Start to serve Shopify application');
const args = process.argv.slice(2);
const runningPort = args[0];
const targetPort = args[1];
const apiProxy = httpProxy.createProxyServer();
const runningServer = `http://localhost:${runningPort}`;
const privateKey = fs.readFileSync(
  path.resolve(__dirname, '../ssl.key'),
  'utf8'
);
const certificate = fs.readFileSync(
  path.resolve(__dirname, '../ssl.crt'),
  'utf8'
);
const httpsServer = https.createServer(
  {key: privateKey, cert: certificate},
  function(req, res) {
    apiProxy.web(req, res, {target: runningServer});
  }
);

// Check any program is running on target port
helpers
  .isPortOpen(parseInt(targetPort))
  .then(function() {
    httpsServer.listen(targetPort, () => {
      spinner.info(`HTTP is running on https://localhost:${targetPort}`);
    });
  })
  .catch(function() {
    spinner.fail(
      `Port ${targetPort} is not available. Please choose another to continue.`
    );
  });

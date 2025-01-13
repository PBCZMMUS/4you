const { getDataConnect, validateArgs } = require('firebase/data-connect');

const connectorConfig = {
  connector: 'default',
  service: '4u',
  location: 'us-central1'
};
exports.connectorConfig = connectorConfig;


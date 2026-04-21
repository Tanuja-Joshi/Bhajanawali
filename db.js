const mongoose = require('mongoose');

const DEFAULT_TIMEOUT_MS = 5000;
const dbState = {
  connected: false,
  mode: 'local',
  error: null
};

const getMongoUri = () => process.env.MONGODB_URI || '';

const connectToMongo = async () => {
  const mongoUri = getMongoUri();

  if (!mongoUri) {
    dbState.connected = false;
    dbState.mode = 'local';
    dbState.error = 'MONGODB_URI is not set';
    console.warn('MongoDB disabled: MONGODB_URI is not set. Falling back to local storage.');
    return dbState;
  }

  try {
    await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: DEFAULT_TIMEOUT_MS
    });

    dbState.connected = true;
    dbState.mode = 'mongo';
    dbState.error = null;
    console.log('Connected to MongoDB');
  } catch (err) {
    dbState.connected = false;
    dbState.mode = 'local';
    dbState.error = err.message;
    console.warn(`MongoDB unavailable, using local storage instead: ${err.message}`);
  }

  return dbState;
};

const getDbState = () => ({ ...dbState });

module.exports = {
  connectToMongo,
  getDbState
};

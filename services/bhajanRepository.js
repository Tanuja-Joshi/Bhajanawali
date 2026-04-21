const bhajanModel = require('../models/bhajanSchema');
const localBhajanStore = require('./localBhajanStore');
const { getDbState } = require('../db');
const { normalizeBhajanRecord } = require('./bhajanNormalizer');

const shouldUseMongo = () => getDbState().connected;

const toPlainObject = (doc) => {
  if (!doc) {
    return null;
  }

  const plain = typeof doc.toObject === 'function' ? doc.toObject() : doc;
  if (plain._id && typeof plain._id !== 'string') {
    plain._id = plain._id.toString();
  }
  return normalizeBhajanRecord(plain);
};

const getAllBhajans = async () => {
  if (shouldUseMongo()) {
    const results = await bhajanModel.find({}).sort({ name: 1 }).lean();
    return results.map(toPlainObject);
  }

  return localBhajanStore.getAllBhajans();
};

const getBhajanById = async (id) => {
  if (shouldUseMongo()) {
    return toPlainObject(await bhajanModel.findById(id));
  }

  return localBhajanStore.getBhajanById(id);
};

const getBhajanByName = async (name) => {
  if (shouldUseMongo()) {
    return toPlainObject(await bhajanModel.findOne({ name }).sort({ name: 1 }));
  }

  return localBhajanStore.getBhajanByName(name);
};

const searchBhajansByName = async (query) => {
  if (shouldUseMongo()) {
    const results = await bhajanModel
      .find({ name: { $regex: new RegExp(query || '', 'i') } })
      .sort({ name: 1 })
      .lean();
    return results.map(toPlainObject);
  }

  return localBhajanStore.searchBhajansByName(query);
};

const createBhajan = async (payload) => {
  const normalizedPayload = normalizeBhajanRecord(payload);
  if (shouldUseMongo()) {
    return toPlainObject(await bhajanModel.create(normalizedPayload));
  }

  return localBhajanStore.addBhajan(normalizedPayload);
};

const updateBhajan = async (id, payload) => {
  const normalizedPayload = normalizeBhajanRecord(payload);
  if (shouldUseMongo()) {
    return toPlainObject(
      await bhajanModel.findByIdAndUpdate(id, normalizedPayload, { new: true, runValidators: true })
    );
  }

  return localBhajanStore.updateBhajan(id, normalizedPayload);
};

const deleteBhajan = async (id) => {
  if (shouldUseMongo()) {
    return toPlainObject(await bhajanModel.findByIdAndDelete(id));
  }

  return localBhajanStore.deleteBhajan(id);
};

module.exports = {
  getAllBhajans,
  getBhajanById,
  getBhajanByName,
  searchBhajansByName,
  createBhajan,
  updateBhajan,
  deleteBhajan
};

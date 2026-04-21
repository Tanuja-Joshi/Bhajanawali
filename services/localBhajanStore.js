const fs = require('fs/promises');
const path = require('path');
const crypto = require('crypto');
const { normalizeBhajanRecord } = require('./bhajanNormalizer');

const seedFilePath = path.join(__dirname, '..', 'Bhajanawali.bhajans.json');
const localFilePath = path.join(__dirname, '..', 'data', 'bhajans.local.json');

const normalizeId = (rawId) => {
  if (!rawId) {
    return crypto.randomUUID();
  }

  if (typeof rawId === 'string') {
    return rawId;
  }

  if (rawId.$oid) {
    return rawId.$oid;
  }

  return String(rawId);
};

const normalizeBhajan = (bhajan) =>
  normalizeBhajanRecord({
    ...bhajan,
    _id: normalizeId(bhajan._id)
  });

const sortByName = (items) => [...items].sort((left, right) => left.name.localeCompare(right.name, 'en'));

const ensureStore = async () => {
  try {
    await fs.access(localFilePath);
  } catch (error) {
    const seedContents = await fs.readFile(seedFilePath, 'utf8');
    const seedData = JSON.parse(seedContents).map(normalizeBhajan);
    await fs.mkdir(path.dirname(localFilePath), { recursive: true });
    await fs.writeFile(localFilePath, JSON.stringify(sortByName(seedData), null, 2), 'utf8');
  }
};

const readStore = async () => {
  await ensureStore();
  const contents = await fs.readFile(localFilePath, 'utf8');
  return JSON.parse(contents).map(normalizeBhajan);
};

const writeStore = async (bhajans) => {
  await fs.mkdir(path.dirname(localFilePath), { recursive: true });
  await fs.writeFile(localFilePath, JSON.stringify(sortByName(bhajans), null, 2), 'utf8');
};

const getAllBhajans = async () => sortByName(await readStore());

const getBhajanById = async (id) => {
  const bhajans = await readStore();
  return bhajans.find((bhajan) => bhajan._id === id) || null;
};

const getBhajanByName = async (name) => {
  const bhajans = await readStore();
  return bhajans.find((bhajan) => bhajan.name === name) || null;
};

const searchBhajansByName = async (query) => {
  const pattern = (query || '').toLowerCase();
  const bhajans = await readStore();
  return sortByName(
    bhajans.filter((bhajan) => bhajan.name.toLowerCase().includes(pattern))
  );
};

const addBhajan = async (bhajan) => {
  const bhajans = await readStore();
  const newBhajan = normalizeBhajan({
    ...bhajan,
    _id: crypto.randomUUID()
  });
  bhajans.push(newBhajan);
  await writeStore(bhajans);
  return newBhajan;
};

const updateBhajan = async (id, updates) => {
  const bhajans = await readStore();
  const index = bhajans.findIndex((bhajan) => bhajan._id === id);

  if (index === -1) {
    return null;
  }

  const updatedBhajan = normalizeBhajan({
    ...bhajans[index],
    ...updates,
    _id: id
  });

  bhajans[index] = updatedBhajan;
  await writeStore(bhajans);
  return updatedBhajan;
};

const deleteBhajan = async (id) => {
  const bhajans = await readStore();
  const existingBhajan = bhajans.find((bhajan) => bhajan._id === id) || null;

  if (!existingBhajan) {
    return null;
  }

  await writeStore(bhajans.filter((bhajan) => bhajan._id !== id));
  return existingBhajan;
};

module.exports = {
  getAllBhajans,
  getBhajanById,
  getBhajanByName,
  searchBhajansByName,
  addBhajan,
  updateBhajan,
  deleteBhajan
};

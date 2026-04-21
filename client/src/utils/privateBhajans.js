import { normalizeBhajanRecord } from './bhajanRecord';

const STORAGE_KEY = 'bhajanawali.privateBhajans';

function canUseStorage() {
  return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
}

function readPrivateBhajans() {
  if (!canUseStorage()) {
    return [];
  }

  try {
    const rawValue = window.localStorage.getItem(STORAGE_KEY);
    if (!rawValue) {
      return [];
    }

    const parsed = JSON.parse(rawValue);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.error('Failed to read private bhajans', error);
    return [];
  }
}

function writePrivateBhajans(bhajans) {
  if (!canUseStorage()) {
    return;
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(bhajans));
}

export function getPrivateBhajans() {
  return readPrivateBhajans().map(normalizeBhajanRecord);
}

export function addPrivateBhajan(bhajan) {
  const existingBhajans = readPrivateBhajans();
  const privateBhajan = {
    ...normalizeBhajanRecord(bhajan),
    _id: `private-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    visibility: 'private',
    isPrivate: true
  };

  writePrivateBhajans([privateBhajan, ...existingBhajans]);
  return privateBhajan;
}

export function deletePrivateBhajan(id) {
  const existingBhajans = readPrivateBhajans();
  writePrivateBhajans(existingBhajans.filter((bhajan) => bhajan._id !== id));
}

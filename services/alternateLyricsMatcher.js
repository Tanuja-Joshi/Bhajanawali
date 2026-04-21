const bhajanRepository = require('./bhajanRepository');
const { findRegistryMatch } = require('./lyricsRegistryService');

const inFlight = new Set();

function getTargetScript(bhajan) {
  return bhajan.originalScript === 'hinglish' ? 'hindi' : 'hinglish';
}

async function updateStatus(id, status, extra = {}) {
  const bhajan = await bhajanRepository.getBhajanById(id);
  if (!bhajan) {
    return null;
  }

  return bhajanRepository.updateBhajan(id, {
    ...bhajan,
    ...extra,
    alternateStatus: status
  });
}

async function runAlternateLyricsMatch(id) {
  if (inFlight.has(id)) {
    return;
  }

  inFlight.add(id);

  try {
    const bhajan = await updateStatus(id, 'searching');
    if (!bhajan) {
      return;
    }

    const targetScript = getTargetScript(bhajan);
    const registryMatch = await findRegistryMatch(bhajan, targetScript);

    if (registryMatch) {
      await bhajanRepository.updateBhajan(id, {
        ...bhajan,
        ...registryMatch
      });
      return;
    }

    await bhajanRepository.updateBhajan(id, {
      ...bhajan,
      alternateScript: targetScript,
      alternateStatus: 'needs_search',
      alternateSource: '',
      matchConfidence: null
    });
  } catch (error) {
    const current = await bhajanRepository.getBhajanById(id);
    if (current) {
      await bhajanRepository.updateBhajan(id, {
        ...current,
        alternateStatus: 'failed',
        alternateSource: error.message
      });
    }
  } finally {
    inFlight.delete(id);
  }
}

function scheduleAlternateLyricsMatch(id) {
  void updateStatus(id, 'queued').then(() => {
    setTimeout(() => {
      void runAlternateLyricsMatch(id);
    }, 0);
  });
}

module.exports = {
  scheduleAlternateLyricsMatch,
  runAlternateLyricsMatch
};

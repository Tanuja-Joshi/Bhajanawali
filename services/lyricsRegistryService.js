const fs = require('fs/promises');
const path = require('path');

const registryFilePath = path.join(__dirname, '..', 'data', 'trustedLyricsRegistry.json');

const normalizeForMatch = (value = '') =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9\u0900-\u097f]+/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();

const getTitleVariants = (bhajan) => {
  const candidates = [
    bhajan.originalName,
    bhajan.name,
    bhajan.alternateName
  ].filter(Boolean);

  return [...new Set(candidates.map(normalizeForMatch).filter(Boolean))];
};

async function readRegistry() {
  try {
    const raw = await fs.readFile(registryFilePath, 'utf8');
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    if (error.code === 'ENOENT') {
      return [];
    }

    throw error;
  }
}

function scoreEntry(entry, bhajan) {
  const titleVariants = getTitleVariants(bhajan);
  const entryVariants = [
    entry.title,
    ...(Array.isArray(entry.aliases) ? entry.aliases : [])
  ]
    .map(normalizeForMatch)
    .filter(Boolean);

  let score = 0;
  for (const variant of titleVariants) {
    if (entryVariants.includes(variant)) {
      score = Math.max(score, 1);
    }

    for (const candidate of entryVariants) {
      if (!candidate) {
        continue;
      }

      if (variant.includes(candidate) || candidate.includes(variant)) {
        score = Math.max(score, 0.82);
      }
    }
  }

  return score;
}

async function findRegistryMatch(bhajan, targetScript) {
  const registry = await readRegistry();
  let bestMatch = null;
  let bestScore = 0;

  for (const entry of registry) {
    if (!entry[targetScript] || !entry[targetScript].lyrics) {
      continue;
    }

    const score = scoreEntry(entry, bhajan);
    if (score > bestScore) {
      bestScore = score;
      bestMatch = entry;
    }
  }

  if (!bestMatch || bestScore < 0.8) {
    return null;
  }

  return {
    alternateName: bestMatch[targetScript].name || bestMatch.title || '',
    alternateBhajan: bestMatch[targetScript].lyrics || '',
    alternateScript: targetScript,
    alternateStatus: 'matched',
    alternateSource: bestMatch.source || 'trusted_registry',
    matchConfidence: Number(bestScore.toFixed(2))
  };
}

module.exports = {
  findRegistryMatch,
  normalizeForMatch
};

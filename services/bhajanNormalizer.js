const normalizeBhajanRecord = (bhajan = {}) => {
  const originalScript = bhajan.originalScript || 'hindi';
  const originalName = bhajan.originalName || bhajan.name || '';
  const originalBhajan = bhajan.originalBhajan || bhajan.Bhajan || '';
  const alternateScript =
    bhajan.alternateScript || (originalScript === 'hindi' ? 'hinglish' : 'hindi');

  return {
    ...bhajan,
    name: originalName,
    Bhajan: originalBhajan,
    originalName,
    originalBhajan,
    originalScript,
    alternateName: bhajan.alternateName || '',
    alternateBhajan: bhajan.alternateBhajan || '',
    alternateScript,
    alternateStatus:
      bhajan.alternateStatus ||
      (bhajan.alternateName || bhajan.alternateBhajan ? 'generated' : 'missing'),
    alternateSource: bhajan.alternateSource || '',
    matchConfidence:
      typeof bhajan.matchConfidence === 'number' ? bhajan.matchConfidence : null,
    link: bhajan.link || ''
  };
};

module.exports = {
  normalizeBhajanRecord
};

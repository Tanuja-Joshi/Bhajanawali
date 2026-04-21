import { formatBhajanText, transliterateDevanagariToHinglish } from './transliteration';

export function normalizeBhajanRecord(record = {}) {
  const originalScript = record.originalScript || 'hindi';
  const originalName = record.originalName || record.name || '';
  const originalBhajan = record.originalBhajan || record.Bhajan || '';
  const alternateScript =
    record.alternateScript || (originalScript === 'hindi' ? 'hinglish' : 'hindi');

  return {
    ...record,
    name: originalName,
    Bhajan: originalBhajan,
    originalName,
    originalBhajan,
    originalScript,
    alternateName: record.alternateName || '',
    alternateBhajan: record.alternateBhajan || '',
    alternateScript,
    alternateStatus:
      record.alternateStatus ||
      (record.alternateName || record.alternateBhajan ? 'generated' : 'missing')
  };
}

export function createBhajanPayload({ name, Bhajan, link, visibility, inputMode }) {
  const cleanedName = formatBhajanText(name);
  const cleanedBhajan = formatBhajanText(Bhajan);

  const generatedAlternate =
    inputMode === 'hindi'
      ? {
          alternateName: transliterateDevanagariToHinglish(cleanedName),
          alternateBhajan: transliterateDevanagariToHinglish(cleanedBhajan),
          alternateScript: 'hinglish',
          alternateStatus: 'generated',
          alternateSource: 'local_transliteration',
          matchConfidence: 0.35
        }
      : {
          alternateName: '',
          alternateBhajan: '',
          alternateScript: 'hindi',
          alternateStatus: 'needs_search',
          alternateSource: '',
          matchConfidence: null
        };

  return {
    name: cleanedName,
    Bhajan: cleanedBhajan,
    originalName: cleanedName,
    originalBhajan: cleanedBhajan,
    originalScript: inputMode,
    link: link.trim(),
    visibility,
    ...generatedAlternate
  };
}

export function getDisplayBhajan(record, requestedScript) {
  const bhajan = normalizeBhajanRecord(record);
  const originalName = formatBhajanText(bhajan.originalName);
  const originalBhajan = formatBhajanText(bhajan.originalBhajan);
  const alternateName = formatBhajanText(bhajan.alternateName);
  const alternateBhajan = formatBhajanText(bhajan.alternateBhajan);

  if (requestedScript === bhajan.originalScript) {
    return {
      name: originalName,
      Bhajan: originalBhajan,
      script: bhajan.originalScript,
      actualScript: bhajan.originalScript,
      requestedScript,
      isGenerated: false,
      isFallbackOriginal: false,
      missingRequestedScript: false
    };
  }

  if (
    bhajan.alternateScript === requestedScript &&
    (alternateName || alternateBhajan) &&
    bhajan.alternateStatus !== 'missing'
  ) {
    return {
      name: alternateName || originalName,
      Bhajan: alternateBhajan || originalBhajan,
      script: bhajan.alternateScript,
      actualScript: bhajan.alternateScript,
      requestedScript,
      isGenerated: bhajan.alternateStatus !== 'reviewed' && bhajan.alternateStatus !== 'matched',
      isFallbackOriginal: false,
      missingRequestedScript: false
    };
  }

  if (bhajan.originalScript === 'hindi' && requestedScript === 'hinglish') {
    return {
      name: transliterateDevanagariToHinglish(originalName),
      Bhajan: transliterateDevanagariToHinglish(originalBhajan),
      script: 'hinglish',
      actualScript: 'hinglish',
      requestedScript,
      isGenerated: true,
      isFallbackOriginal: false,
      missingRequestedScript: false
    };
  }

  return {
    name: originalName,
    Bhajan: originalBhajan,
    script: bhajan.originalScript,
    actualScript: bhajan.originalScript,
    requestedScript,
    isGenerated: false,
    isFallbackOriginal: true,
    missingRequestedScript: requestedScript !== bhajan.originalScript
  };
}

export function getSearchTexts(record) {
  const bhajan = normalizeBhajanRecord(record);
  const displayOriginal = getDisplayBhajan(bhajan, bhajan.originalScript);
  const displayAlternate = getDisplayBhajan(
    bhajan,
    bhajan.originalScript === 'hindi' ? 'hinglish' : 'hindi'
  );

  return [
    displayOriginal.name,
    displayOriginal.Bhajan,
    displayAlternate.name,
    displayAlternate.Bhajan
  ]
    .filter(Boolean)
    .join('\n')
    .toLowerCase();
}

const INDEPENDENT_VOWELS = {
  '\u0905': 'a',
  '\u0906': 'aa',
  '\u0907': 'i',
  '\u0908': 'i',
  '\u0909': 'u',
  '\u090A': 'u',
  '\u090B': 'ri',
  '\u090F': 'e',
  '\u0910': 'ai',
  '\u0913': 'o',
  '\u0914': 'au',
  '\u0911': 'o',
  '\u090D': 'e'
};

const CONSONANTS = {
  '\u0915': 'k',
  '\u0916': 'kh',
  '\u0917': 'g',
  '\u0918': 'gh',
  '\u0919': 'ng',
  '\u091A': 'ch',
  '\u091B': 'chh',
  '\u091C': 'j',
  '\u091D': 'jh',
  '\u091E': 'ny',
  '\u091F': 't',
  '\u0920': 'th',
  '\u0921': 'd',
  '\u0922': 'dh',
  '\u0923': 'n',
  '\u0924': 't',
  '\u0925': 'th',
  '\u0926': 'd',
  '\u0927': 'dh',
  '\u0928': 'n',
  '\u092A': 'p',
  '\u092B': 'ph',
  '\u092C': 'b',
  '\u092D': 'bh',
  '\u092E': 'm',
  '\u092F': 'y',
  '\u0930': 'r',
  '\u0932': 'l',
  '\u0935': 'v',
  '\u0936': 'sh',
  '\u0937': 'sh',
  '\u0938': 's',
  '\u0939': 'h',
  '\u0958': 'q',
  '\u0959': 'kh',
  '\u095A': 'gh',
  '\u095B': 'z',
  '\u095C': 'r',
  '\u095D': 'rh',
  '\u095E': 'f',
  '\u095F': 'y'
};

const MATRAS = {
  '\u093E': 'aa',
  '\u093F': 'i',
  '\u0940': 'i',
  '\u0941': 'u',
  '\u0942': 'u',
  '\u0943': 'ri',
  '\u0947': 'e',
  '\u0948': 'ai',
  '\u094B': 'o',
  '\u094C': 'au',
  '\u0949': 'o',
  '\u0945': 'e'
};

const MARKS = {
  '\u0902': 'n',
  '\u0903': 'h',
  '\u0901': 'n',
  '\u093C': '',
  '\u093D': "'"
};

const VIRAMA = '\u094D';

const HINGLISH_WORD_MAP = {
  '\u0906\u0930\u0924\u0940': 'aarti',
  '\u0936\u094D\u0930\u0940': 'shri',
  '\u0915\u0943\u0937\u094D\u0923': 'krishna',
  '\u0915\u0943\u0937\u094D\u0923\u093E': 'krishna',
  '\u0936\u094D\u092F\u093E\u092E': 'shyam',
  '\u0930\u093E\u0927\u0947': 'radhe',
  '\u0930\u093E\u0927\u093E': 'radha',
  '\u092E\u0941\u0930\u093E\u0930\u0940': 'murari',
  '\u0917\u093F\u0930\u093F\u0927\u0930': 'giridhar',
  '\u0915\u0941\u0902\u091C\u092C\u093F\u0939\u093E\u0930\u0940': 'kunjbihari',
  '\u092C\u093F\u0939\u093E\u0930\u0940': 'bihari',
  '\u092D\u091C\u0928': 'bhajan',
  '\u0917\u0940\u0924': 'geet',
  '\u0939\u0930\u093F': 'hari',
  '\u0917\u094B\u0935\u093F\u0902\u0926': 'govind',
  '\u0917\u094B\u092A\u093E\u0932': 'gopal',
  '\u092E\u094B\u0939\u0928': 'mohan',
  '\u092C\u0928\u0935\u093E\u0930\u0940': 'banwari',
  '\u0928\u0902\u0926\u0932\u093E\u0932\u093E': 'nandlala',
  '\u0917\u093F\u0930\u093F\u0927\u093E\u0930\u0940': 'giridhari',
  '\u0926\u0930\u094D\u0936\u0928': 'darshan',
  '\u091A\u0930\u0923': 'charan',
  '\u092A\u094D\u0930\u0947\u092E': 'prem',
  '\u092D\u0915\u094D\u0924\u093F': 'bhakti',
  '\u0915\u0940\u0930\u094D\u0924\u0928': 'kirtan',
  '\u092E\u0939\u093E\u0930\u093E\u091C': 'maharaj',
  '\u0920\u093E\u0915\u0941\u0930': 'thakur',
  '\u092A\u094D\u0930\u092D\u0941': 'prabhu',
  '\u091C\u092F': 'jai',
  '\u092E\u0902\u0917\u0932': 'mangal',
  '\u0938\u0941\u0902\u0926\u0930': 'sundar'
};

const ROMAN_CONSONANTS = [
  ['ksh', '\u0915\u094D\u0937'],
  ['gy', '\u091C\u094D\u091E'],
  ['gn', '\u091C\u094D\u091E'],
  ['chh', '\u091B'],
  ['kh', '\u0916'],
  ['gh', '\u0918'],
  ['jh', '\u091D'],
  ['th', '\u0925'],
  ['dh', '\u0927'],
  ['ph', '\u092B'],
  ['bh', '\u092D'],
  ['sh', '\u0936'],
  ['ch', '\u091A'],
  ['ng', '\u0919'],
  ['ny', '\u091E'],
  ['q', '\u0958'],
  ['f', '\u095E'],
  ['z', '\u095B'],
  ['k', '\u0915'],
  ['g', '\u0917'],
  ['j', '\u091C'],
  ['t', '\u0924'],
  ['d', '\u0926'],
  ['n', '\u0928'],
  ['p', '\u092A'],
  ['b', '\u092C'],
  ['m', '\u092E'],
  ['y', '\u092F'],
  ['r', '\u0930'],
  ['l', '\u0932'],
  ['v', '\u0935'],
  ['w', '\u0935'],
  ['s', '\u0938'],
  ['h', '\u0939']
];

const ROMAN_VOWELS = [
  ['aai', { independent: '\u0906\u0908', matra: '\u093E\u0908' }],
  ['aa', { independent: '\u0906', matra: '\u093E' }],
  ['ii', { independent: '\u0908', matra: '\u0940' }],
  ['ee', { independent: '\u0908', matra: '\u0940' }],
  ['oo', { independent: '\u090A', matra: '\u0942' }],
  ['uu', { independent: '\u090A', matra: '\u0942' }],
  ['ai', { independent: '\u0910', matra: '\u0948' }],
  ['au', { independent: '\u0914', matra: '\u094C' }],
  ['ri', { independent: '\u090B', matra: '\u0943' }],
  ['a', { independent: '\u0905', matra: '' }],
  ['i', { independent: '\u0907', matra: '\u093F' }],
  ['u', { independent: '\u0909', matra: '\u0941' }],
  ['e', { independent: '\u090F', matra: '\u0947' }],
  ['o', { independent: '\u0913', matra: '\u094B' }]
];

function matchRomanToken(input, index, options) {
  return options.find(([token]) => input.startsWith(token, index)) || null;
}

function transliterateRomanWord(word) {
  let result = '';
  let index = 0;

  while (index < word.length) {
    const vowelMatch = matchRomanToken(word, index, ROMAN_VOWELS);
    if (vowelMatch) {
      result += vowelMatch[1].independent;
      index += vowelMatch[0].length;
      continue;
    }

    const consonantMatch = matchRomanToken(word, index, ROMAN_CONSONANTS);
    if (!consonantMatch) {
      result += word[index];
      index += 1;
      continue;
    }

    const consonant = consonantMatch[1];
    index += consonantMatch[0].length;

    const trailingVowel = matchRomanToken(word, index, ROMAN_VOWELS);
    if (trailingVowel) {
      result += consonant + trailingVowel[1].matra;
      index += trailingVowel[0].length;
      continue;
    }

    const nextConsonant = matchRomanToken(word, index, ROMAN_CONSONANTS);
    if (nextConsonant) {
      result += consonant + VIRAMA;
      continue;
    }

    result += consonant;
  }

  return result;
}

export function transliterateRomanToDevanagari(input = '') {
  return input.replace(/[A-Za-z']+/g, (word) => transliterateRomanWord(word.toLowerCase()));
}

export function transliterateDevanagari(input = '') {
  let result = '';

  for (let index = 0; index < input.length; index += 1) {
    const current = input[index];
    const next = input[index + 1];

    if (INDEPENDENT_VOWELS[current]) {
      result += INDEPENDENT_VOWELS[current];
      continue;
    }

    if (CONSONANTS[current]) {
      const base = CONSONANTS[current];

      if (next === VIRAMA) {
        result += base;
        index += 1;
        continue;
      }

      if (MATRAS[next]) {
        result += base + MATRAS[next];
        index += 1;
        continue;
      }

      result += `${base}a`;
      continue;
    }

    if (MATRAS[current]) {
      result += MATRAS[current];
      continue;
    }

    if (MARKS[current] !== undefined) {
      result += MARKS[current];
      continue;
    }

    result += current;
  }

  return result;
}

function transliterateDevanagariWord(word = '') {
  if (HINGLISH_WORD_MAP[word]) {
    return HINGLISH_WORD_MAP[word];
  }

  return transliterateDevanagari(word)
    .replace(/aai/g, 'ai')
    .replace(/([^a]|^)aa([^aeiou]|$)/g, '$1a$2')
    .replace(/shrii/g, 'shri')
    .replace(/krshna/g, 'krishna')
    .replace(/muraari/g, 'murari')
    .replace(/giridhar/g, 'giridhar')
    .replace(/kunjabihari/g, 'kunjbihari');
}

function naturalizeHinglish(text = '') {
  return text
    .replace(/\bkapha\b/gi, 'kaph')
    .replace(/\broga\b/gi, 'rog')
    .replace(/\bdila\b/gi, 'dil')
    .replace(/\btasira\b/gi, 'taseer')
    .replace(/\bbimaria\b/gi, 'bimari')
    .replace(/\bdekhe\b/gi, 'dekhe')
    .replace(/\bmujhe\b/gi, 'mujhe')
    .replace(/\bdekhara\b/gi, 'dekhkar')
    .replace(/\bcharana\b/gi, 'charan')
    .replace(/\bdarasana\b/gi, 'darshan')
    .replace(/\bvaida\b/gi, 'vaid')
    .replace(/\bbanavaari\b/gi, 'banwari')
    .replace(/\bnandalala\b/gi, 'nandlala')
    .replace(/\bkunjabihari\b/gi, 'kunjbihari')
    .replace(/\bgiridhaari\b/gi, 'giridhari')
    .replace(/\bgiridhara\b/gi, 'giridhar')
    .replace(/\bmohana\b/gi, 'mohan')
    .replace(/\bsundara\b/gi, 'sundar')
    .replace(/\bprema\b/gi, 'prem')
    .replace(/\bbhajana\b/gi, 'bhajan')
    .replace(/\bkirtana\b/gi, 'kirtan')
    .replace(/\bprabhua\b/gi, 'prabhu')
    .replace(/\bshyaama\b/gi, 'shyama')
    .replace(/\bshyaam\b/gi, 'shyam')
    .replace(/\bkrishnaa\b/gi, 'krishna')
    .replace(/\bmurarii\b/gi, 'murari')
    .replace(/\baarti\b/gi, 'aarti');
}

export function transliterateDevanagariToHinglish(input = '') {
  const transliterated = input.replace(/[\u0900-\u097F]+/g, (word) =>
    transliterateDevanagariWord(word)
  );
  return naturalizeHinglish(transliterated);
}

export function stripHtml(text = '') {
  return text.replace(/<br\s*\/?>/gi, '\n').replace(/<[^>]+>/g, '');
}

export function formatBhajanText(text = '') {
  return stripHtml(text)
    .replace(/\r\n/g, '\n')
    .replace(/[ \t]+\n/g, '\n')
    .replace(/\n[ \t]+/g, '\n')
    .replace(/\n{2,}/g, '\n')
    .trim();
}

export function normalizeInputForStorage(text = '', inputMode = 'hindi') {
  const cleaned = formatBhajanText(text);
  return inputMode === 'hinglish' ? transliterateRomanToDevanagari(cleaned) : cleaned;
}

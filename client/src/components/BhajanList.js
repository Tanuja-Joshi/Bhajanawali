import React, { useState } from 'react';
import { getDisplayBhajan, getSearchTexts, normalizeBhajanRecord } from '../utils/bhajanRecord';

function BhajanList({ bhajans, onSelectBhajan, onRefresh, scriptMode }) {
  const [searchTerm, setSearchTerm] = useState('');
  const labels =
    scriptMode === 'hindi'
      ? {
          search: '\u0939\u093F\u0902\u0926\u0940 \u092F\u093E \u0939\u093F\u0902\u0917\u094D\u0932\u093F\u0936 \u092E\u0947\u0902 \u092D\u091C\u0928 \u0916\u094B\u091C\u0947\u0902...',
          refresh: '\u0924\u093E\u095B\u093E \u0915\u0930\u0947\u0902',
          empty: '\u0915\u094B\u0908 \u092D\u091C\u0928 \u0928\u0939\u0940\u0902 \u092E\u093F\u0932\u093E'
        }
      : {
          search: 'Search bhajans in Hindi or Hinglish...',
          refresh: 'Refresh',
          empty: 'No bhajans found',
          publicBadge: 'Public',
          privateBadge: 'Private',
          generated: `Auto-generated ${scriptMode} view`,
          fallback:
            scriptMode === 'hindi'
              ? 'Hindi not available yet'
              : 'Hinglish not available yet'
        };
  if (scriptMode === 'hindi') {
    labels.publicBadge = '\u0938\u093E\u0930\u094D\u0935\u091C\u0928\u093F\u0915';
    labels.privateBadge = '\u0928\u093F\u091C\u0940';
    labels.generated = `\u0911\u091F\u094B-\u091C\u0947\u0928\u0930\u0947\u091F\u0947\u0921 ${scriptMode} \u0935\u094D\u092F\u0942`;
    labels.fallback = '\u0939\u093F\u0902\u0926\u0940 \u0905\u092D\u0940 \u0909\u092A\u0932\u092C\u094D\u0927 \u0928\u0939\u0940\u0902';
  }

  const normalizedQuery = searchTerm.trim().toLowerCase();

  const filteredBhajans = bhajans.filter((bhajan) => {
    if (!normalizedQuery) {
      return true;
    }

    return getSearchTexts(bhajan).includes(normalizedQuery);
  });

  return (
    <div>
      <div style={{ marginBottom: '15px' }}>
        <input
          type="text"
          placeholder={labels.search}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: '100%',
            padding: '10px 12px',
            border: '1px solid #ddd',
            borderRadius: '8px',
            fontSize: '14px',
            marginBottom: '10px'
          }}
        />
        <button
          onClick={onRefresh}
          style={{
            width: '100%',
            padding: '10px',
            background: '#f0f0f0',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '500'
          }}
        >
          {labels.refresh}
        </button>
      </div>

      {filteredBhajans.length === 0 ? (
        <div
          style={{
            textAlign: 'center',
            padding: '40px 20px',
            color: '#999'
          }}
        >
          <p style={{ fontSize: '14px' }}>{labels.empty}</p>
        </div>
      ) : (
        <div className="bhajan-list">
          {filteredBhajans.map((bhajan) => {
            const normalizedBhajan = normalizeBhajanRecord(bhajan);
            const displayBhajan = getDisplayBhajan(normalizedBhajan, scriptMode);
            const previewText = displayBhajan.Bhajan;

            return (
              <div
                key={bhajan._id}
                className="bhajan-card"
                onClick={() => onSelectBhajan(bhajan)}
              >
                <h3>{displayBhajan.name}</h3>
                <div className={`visibility-badge ${bhajan.visibility === 'private' ? 'private' : 'public'}`}>
                  {bhajan.visibility === 'private' ? labels.privateBadge : labels.publicBadge}
                </div>
                {displayBhajan.missingRequestedScript && (
                  <div className="conversion-note">{labels.fallback}</div>
                )}
                {!displayBhajan.missingRequestedScript && displayBhajan.isGenerated && (
                  <div className="conversion-note">{labels.generated}</div>
                )}
                <p>{previewText.substring(0, 100)}...</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default BhajanList;

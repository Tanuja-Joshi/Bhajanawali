import React from 'react';
import { getDisplayBhajan, normalizeBhajanRecord } from '../utils/bhajanRecord';

function BhajanDetail({ bhajan, onDelete, onBack, onRefresh, onRequestAlternateMatch, scriptMode }) {
  const openYouTube = () => {
    if (bhajan.link) {
      window.open(bhajan.link, '_blank');
    }
  };

  const normalizedBhajan = normalizeBhajanRecord(bhajan);
  const displayBhajan = getDisplayBhajan(normalizedBhajan, scriptMode);
  const displayName = displayBhajan.name;
  const displayLyrics = displayBhajan.Bhajan;
  const detailLabels =
    scriptMode === 'hindi'
      ? {
          back: '\u0938\u0942\u091A\u0940 \u092E\u0947\u0902 \u0935\u093E\u092A\u0938',
          delete: '\u0939\u091F\u093E\u090F\u0901',
          youtube: '\u092F\u0942\u091F\u094D\u092F\u0942\u092C \u092A\u0930 \u0938\u0941\u0928\u0947\u0902',
          refresh: '\u0924\u093E\u095B\u093E \u0915\u0930\u0947\u0902',
          close: '\u092C\u0902\u0926 \u0915\u0930\u0947\u0902'
        }
      : {
          back: 'Back to List',
          delete: 'Delete',
          youtube: 'Listen on YouTube',
          refresh: 'Refresh',
          close: 'Close',
          publicBadge: 'Public',
          privateBadge: 'Private',
          generated: `This ${scriptMode} version is auto-generated. Original text is kept safely.`,
          fallback:
            scriptMode === 'hindi'
              ? 'Hindi lyrics are not available yet. Showing the original Hinglish text.'
              : 'Hinglish lyrics are not available yet. Showing the original Hindi text.',
          queueLookup: scriptMode === 'hindi' ? 'Find Hindi lyrics' : 'Find Hinglish lyrics'
        };
  if (scriptMode === 'hindi') {
    detailLabels.publicBadge = '\u0938\u093E\u0930\u094D\u0935\u091C\u0928\u093F\u0915';
    detailLabels.privateBadge = '\u0928\u093F\u091C\u0940';
    detailLabels.generated =
      `\u092F\u0939 ${scriptMode} \u0935\u0930\u094D\u091C\u0928 \u0911\u091F\u094B-\u091C\u0947\u0928\u0930\u0947\u091F\u0947\u0921 \u0939\u0948\u0964 \u0905\u0938\u0932 \u091F\u0947\u0915\u094D\u0938\u094D\u091F \u0938\u0941\u0930\u0915\u094D\u0937\u093F\u0924 \u0939\u0948\u0964`;
    detailLabels.fallback =
      '\u0939\u093F\u0902\u0926\u0940 \u0932\u093F\u0930\u093F\u0915\u094D\u0938 \u0905\u092D\u0940 \u0909\u092A\u0932\u092C\u094D\u0927 \u0928\u0939\u0940\u0902 \u0939\u0948\u0902\u0964 \u0905\u0938\u0932 \u0939\u093F\u0902\u0917\u094D\u0932\u093F\u0936 \u091F\u0947\u0915\u094D\u0938\u094D\u091F \u0926\u093F\u0916\u093E\u092F\u093E \u091C\u093E \u0930\u0939\u093E \u0939\u0948\u0964';
    detailLabels.queueLookup =
      scriptMode === 'hindi'
        ? '\u0939\u093F\u0902\u0926\u0940 \u0932\u093F\u0930\u093F\u0915\u094D\u0938 \u0916\u094B\u091C\u0947\u0902'
        : '\u0939\u093F\u0902\u0917\u094D\u0932\u093F\u0936 \u0932\u093F\u0930\u093F\u0915\u094D\u0938 \u0916\u094B\u091C\u0947\u0902';
  }

  const matchStatusLabels =
    scriptMode === 'hindi'
      ? {
          matched: '\u0935\u093F\u0915\u0932\u094D\u092A \u0932\u093F\u0930\u093F\u0915\u094D\u0938 \u092E\u093F\u0932 \u0917\u090F',
          queued: '\u0932\u0941\u0915\u0905\u092A \u0915\u094D\u092F\u0942 \u092E\u0947\u0902 \u0939\u0948',
          searching: '\u0935\u093F\u0915\u0932\u094D\u092A \u0932\u093F\u0930\u093F\u0915\u094D\u0938 \u0916\u094B\u091C\u0947 \u091C\u093E \u0930\u0939\u0947 \u0939\u0948\u0902',
          failed: '\u0932\u0941\u0915\u0905\u092A \u0905\u0938\u092B\u0932 \u0930\u0939\u093E',
          needs_search: '\u0935\u093F\u0936\u094D\u0935\u0938\u0928\u0940\u092F \u0938\u094D\u0930\u094B\u0924 \u0938\u0947 \u0932\u093F\u0930\u093F\u0915\u094D\u0938 \u0905\u092D\u0940 \u0928\u0939\u0940\u0902 \u092E\u093F\u0932\u0940',
          generated: '\u0938\u094D\u0925\u093E\u0928\u0940\u092F \u091C\u0947\u0928\u0930\u0947\u091F\u0947\u0921 \u0935\u0930\u094D\u091C\u0928'
        }
      : {
          matched: 'Alternate lyrics found from trusted source',
          queued: 'Alternate lyrics lookup is queued',
          searching: 'Searching trusted sources for alternate lyrics',
          failed: 'Alternate lyrics lookup failed',
          needs_search: 'No trusted-source alternate lyrics found yet',
          generated: 'Local generated alternate is available'
        };

  return (
    <div>
      <button onClick={onBack} className="back-button">
        {detailLabels.back}
      </button>

      <div className="detail-view">
        <div className="detail-header">
          <div className="detail-title-block">
            <h2>{displayName}</h2>
            <div className={`visibility-badge ${bhajan.visibility === 'private' ? 'private' : 'public'}`}>
              {bhajan.visibility === 'private'
                ? detailLabels.privateBadge
                : detailLabels.publicBadge}
            </div>
            {displayBhajan.missingRequestedScript && (
              <div className="conversion-note">{detailLabels.fallback}</div>
            )}
            {!displayBhajan.missingRequestedScript && displayBhajan.isGenerated && (
              <div className="conversion-note">
                {detailLabels.generated}
              </div>
            )}
          </div>
          <button
            onClick={onDelete}
            style={{
              padding: '8px 12px',
              background: '#f44336',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '12px',
              fontWeight: '500'
            }}
          >
            {detailLabels.delete}
          </button>
        </div>

        <div className="bhajan-text" style={{ whiteSpace: 'pre-wrap' }}>
          {displayLyrics}
        </div>

        <div className="match-status-panel">
          <div className="match-status-line">
            {matchStatusLabels[normalizedBhajan.alternateStatus] || normalizedBhajan.alternateStatus}
          </div>
          {normalizedBhajan.visibility !== 'private' &&
            normalizedBhajan.alternateStatus !== 'matched' &&
            normalizedBhajan.alternateStatus !== 'reviewed' && (
              <button onClick={onRequestAlternateMatch} className="btn btn-secondary">
                {detailLabels.queueLookup}
              </button>
            )}
        </div>

        {bhajan.link && (
          <div className="youtube-link">
            <button
              onClick={openYouTube}
              style={{
                width: '100%',
                padding: '12px',
                background: '#ff0000',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '500'
              }}
            >
              {detailLabels.youtube}
            </button>
          </div>
        )}

        <div
          style={{
            marginTop: '20px',
            paddingTop: '20px',
            borderTop: '1px solid #eee',
            display: 'flex',
            gap: '10px'
          }}
        >
          <button onClick={onRefresh} className="btn btn-secondary" style={{ flex: 1 }}>
            {detailLabels.refresh}
          </button>
          <button onClick={onBack} className="btn btn-secondary" style={{ flex: 1 }}>
            {detailLabels.close}
          </button>
        </div>
      </div>
    </div>
  );
}

export default BhajanDetail;

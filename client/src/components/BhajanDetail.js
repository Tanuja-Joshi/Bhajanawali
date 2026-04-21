import React from 'react';

function BhajanDetail({ bhajan, onDelete, onBack, onRefresh }) {
  const openYouTube = () => {
    if (bhajan.link) {
      window.open(bhajan.link, '_blank');
    }
  };

  return (
    <div>
      <button 
        onClick={onBack}
        className="back-button"
      >
        ← Back to List
      </button>

      <div className="detail-view">
        <div className="detail-header">
          <h2>{bhajan.name}</h2>
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
            🗑️ Delete
          </button>
        </div>

        <div className="bhajan-text" style={{ whiteSpace: 'pre-wrap' }}>
          {bhajan.Bhajan}
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
              ▶️ Listen on YouTube
            </button>
          </div>
        )}

        <div style={{
          marginTop: '20px',
          paddingTop: '20px',
          borderTop: '1px solid #eee',
          display: 'flex',
          gap: '10px'
        }}>
          <button 
            onClick={onRefresh}
            className="btn btn-secondary"
            style={{ flex: 1 }}
          >
            🔄 Refresh
          </button>
          <button 
            onClick={onBack}
            className="btn btn-secondary"
            style={{ flex: 1 }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default BhajanDetail;

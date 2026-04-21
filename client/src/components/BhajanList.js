import React, { useState } from 'react';

function BhajanList({ bhajans, onSelectBhajan, onRefresh }) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredBhajans = bhajans.filter(bhajan =>
    bhajan.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    bhajan.Bhajan?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div style={{ marginBottom: '15px' }}>
        <input
          type="text"
          placeholder="🔍 Search bhajans..."
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
          🔄 Refresh
        </button>
      </div>

      {filteredBhajans.length === 0 ? (
        <div style={{
          textAlign: 'center',
          padding: '40px 20px',
          color: '#999'
        }}>
          <p style={{ fontSize: '14px' }}>No bhajans found</p>
        </div>
      ) : (
        <div className="bhajan-list">
          {filteredBhajans.map(bhajan => (
            <div 
              key={bhajan._id}
              className="bhajan-card"
              onClick={() => onSelectBhajan(bhajan)}
            >
              <h3>{bhajan.name}</h3>
              <p>{bhajan.Bhajan?.substring(0, 100)}...</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default BhajanList;

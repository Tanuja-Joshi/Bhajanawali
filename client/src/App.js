import React, { useEffect, useState } from 'react';
import { getBhajans, addBhajan, deleteBhajan, requestAlternateMatch } from './api';
import BhajanList from './components/BhajanList';
import AddBhajan from './components/AddBhajan';
import BhajanDetail from './components/BhajanDetail';
import { UI_TEXT } from './utils/bhajanLabels';
import { normalizeBhajanRecord } from './utils/bhajanRecord';
import { addPrivateBhajan, deletePrivateBhajan, getPrivateBhajans } from './utils/privateBhajans';
import './App.css';

function App() {
  const [bhajans, setBhajans] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [view, setView] = useState('list');
  const [selectedBhajan, setSelectedBhajan] = useState(null);
  const [scriptMode, setScriptMode] = useState('hindi');

  const labels = UI_TEXT[scriptMode];

  useEffect(() => {
    fetchBhajans();
  }, []);

  const fetchBhajans = async () => {
    try {
      setLoading(true);
      const response = await getBhajans();
      const publicBhajans = (response.data.data || []).map((bhajan) => ({
        ...normalizeBhajanRecord(bhajan),
        visibility: 'public',
        isPrivate: false
      }));
      const privateBhajans = getPrivateBhajans();
      setBhajans([...privateBhajans, ...publicBhajans]);
      setError(null);
    } catch (err) {
      const privateBhajans = getPrivateBhajans();
      setBhajans(privateBhajans);
      setError(`Failed to load public bhajans. ${err.message}`);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddBhajan = async (newBhajan) => {
    try {
      setLoading(true);
      if (newBhajan.visibility === 'private') {
        addPrivateBhajan(newBhajan);
      } else {
        await addBhajan(newBhajan);
      }
      await fetchBhajans();
      setView('list');
      setError(null);
    } catch (err) {
      setError(`Failed to add bhajan. ${err.message}`);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteBhajan = async (bhajan) => {
    if (window.confirm(labels.confirmDelete)) {
      try {
        setLoading(true);
        if (bhajan.isPrivate || bhajan.visibility === 'private') {
          deletePrivateBhajan(bhajan._id);
        } else {
          await deleteBhajan(bhajan._id);
        }
        await fetchBhajans();
        if (selectedBhajan?._id === bhajan._id) {
          setView('list');
          setSelectedBhajan(null);
        }
        setError(null);
      } catch (err) {
        setError(`Failed to delete bhajan. ${err.message}`);
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleSelectBhajan = (bhajan) => {
    setSelectedBhajan(bhajan);
    setView('detail');
  };

  const handleRequestAlternateMatch = async (bhajan) => {
    if (bhajan.visibility === 'private') {
      setError('Private bhajans can use the saved original text, but trusted-source matching is only available for server-saved public bhajans right now.');
      return;
    }

    try {
      await requestAlternateMatch(bhajan._id);
      await fetchBhajans();
      setError(null);
    } catch (err) {
      setError(`Failed to queue alternate lyrics search. ${err.message}`);
      console.error(err);
    }
  };

  return (
    <div className="app">
      <header className="header">
        <h1>{labels.title}</h1>
        <p className="subtitle">{labels.subtitle}</p>
        <div className="script-toggle" role="tablist" aria-label="Script toggle">
          <button
            type="button"
            className={`script-toggle-btn ${scriptMode === 'hindi' ? 'active' : ''}`}
            onClick={() => setScriptMode('hindi')}
          >
            Hindi
          </button>
          <button
            type="button"
            className={`script-toggle-btn ${scriptMode === 'hinglish' ? 'active' : ''}`}
            onClick={() => setScriptMode('hinglish')}
          >
            Hinglish
          </button>
        </div>
      </header>

      {error && (
        <div className="error-banner">
          <span>{error}</span>
          <button onClick={() => setError(null)} aria-label="Dismiss error">
            x
          </button>
        </div>
      )}

      <nav className="nav">
        <button
          className={`nav-btn ${view === 'list' ? 'active' : ''}`}
          onClick={() => setView('list')}
        >
          {labels.list}
        </button>
        <button
          className={`nav-btn ${view === 'add' ? 'active' : ''}`}
          onClick={() => setView('add')}
        >
          {labels.add}
        </button>
      </nav>

      <main className="container">
        {loading && <div className="loading">Loading...</div>}

        {view === 'list' && !loading && (
          <BhajanList
            bhajans={bhajans}
            onSelectBhajan={handleSelectBhajan}
            onRefresh={fetchBhajans}
            scriptMode={scriptMode}
          />
        )}

        {view === 'add' && (
          <AddBhajan
            onSave={handleAddBhajan}
            onCancel={() => setView('list')}
            scriptMode={scriptMode}
          />
        )}

        {view === 'detail' && selectedBhajan && (
          <BhajanDetail
            bhajan={selectedBhajan}
            onDelete={() => handleDeleteBhajan(selectedBhajan)}
            onBack={() => setView('list')}
            onRefresh={fetchBhajans}
            onRequestAlternateMatch={() => handleRequestAlternateMatch(selectedBhajan)}
            scriptMode={scriptMode}
          />
        )}
      </main>
    </div>
  );
}

export default App;

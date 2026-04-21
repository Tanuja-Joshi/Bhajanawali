import React, { useState, useEffect } from 'react';
import { getBhajans, addBhajan, deleteBhajan } from './api';
import BhajanList from './components/BhajanList';
import AddBhajan from './components/AddBhajan';
import BhajanDetail from './components/BhajanDetail';
import './App.css';

function App() {
  const [bhajans, setBhajans] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [view, setView] = useState('list'); // list, add, detail
  const [selectedBhajan, setSelectedBhajan] = useState(null);

  // Fetch bhajans on mount
  useEffect(() => {
    fetchBhajans();
  }, []);

  const fetchBhajans = async () => {
    try {
      setLoading(true);
      const response = await getBhajans();
      setBhajans(response.data.data || []);
      setError(null);
    } catch (err) {
      setError('Failed to load bhajans. ' + err.message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddBhajan = async (newBhajan) => {
    try {
      setLoading(true);
      await addBhajan(newBhajan);
      await fetchBhajans();
      setView('list');
      setError(null);
    } catch (err) {
      setError('Failed to add bhajan. ' + err.message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteBhajan = async (id) => {
    if (window.confirm('Are you sure you want to delete this bhajan?')) {
      try {
        setLoading(true);
        await deleteBhajan(id);
        await fetchBhajans();
        if (selectedBhajan?._id === id) {
          setView('list');
        }
        setError(null);
      } catch (err) {
        setError('Failed to delete bhajan. ' + err.message);
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

  return (
    <div className="app">
      <header className="header">
        <h1>🙏 Bhajanawali</h1>
        <p className="subtitle">Bhajan Management App</p>
      </header>

      {error && (
        <div className="error-banner">
          <span>{error}</span>
          <button onClick={() => setError(null)}>✕</button>
        </div>
      )}

      <nav className="nav">
        <button 
          className={`nav-btn ${view === 'list' ? 'active' : ''}`}
          onClick={() => setView('list')}
        >
          📚 Bhajans
        </button>
        <button 
          className={`nav-btn ${view === 'add' ? 'active' : ''}`}
          onClick={() => setView('add')}
        >
          ➕ Add New
        </button>
      </nav>

      <main className="container">
        {loading && <div className="loading">Loading...</div>}

        {view === 'list' && !loading && (
          <BhajanList 
            bhajans={bhajans}
            onSelectBhajan={handleSelectBhajan}
            onRefresh={fetchBhajans}
          />
        )}

        {view === 'add' && (
          <AddBhajan 
            onSave={handleAddBhajan}
            onCancel={() => setView('list')}
          />
        )}

        {view === 'detail' && selectedBhajan && (
          <BhajanDetail 
            bhajan={selectedBhajan}
            onDelete={() => handleDeleteBhajan(selectedBhajan._id)}
            onBack={() => setView('list')}
            onRefresh={fetchBhajans}
          />
        )}
      </main>
    </div>
  );
}

export default App;

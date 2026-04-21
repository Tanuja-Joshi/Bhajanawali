import React, { useState } from 'react';

function AddBhajan({ onSave, onCancel }) {
  const [formData, setFormData] = useState({
    name: '',
    Bhajan: '',
    link: ''
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Bhajan name is required';
    }
    if (!formData.Bhajan.trim()) {
      newErrors.Bhajan = 'Bhajan lyrics are required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSave(formData);
    }
  };

  return (
    <div className="form">
      <h2 style={{ marginBottom: '20px', color: '#6200ea' }}>Add New Bhajan</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Bhajan Name *</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter bhajan name"
          />
          {errors.name && <span style={{ color: '#f44336', fontSize: '12px' }}>{errors.name}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="Bhajan">Bhajan Lyrics *</label>
          <textarea
            id="Bhajan"
            name="Bhajan"
            value={formData.Bhajan}
            onChange={handleChange}
            placeholder="Enter bhajan lyrics"
          />
          {errors.Bhajan && <span style={{ color: '#f44336', fontSize: '12px' }}>{errors.Bhajan}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="link">YouTube Link (Optional)</label>
          <input
            type="url"
            id="link"
            name="link"
            value={formData.link}
            onChange={handleChange}
            placeholder="https://www.youtube.com/watch?v=..."
          />
        </div>

        <div className="form-buttons">
          <button 
            type="submit" 
            className="btn btn-primary"
          >
            ✓ Save
          </button>
          <button 
            type="button"
            onClick={onCancel}
            className="btn btn-secondary"
          >
            ✕ Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddBhajan;

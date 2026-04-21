import React, { useMemo, useState } from 'react';
import { createBhajanPayload } from '../utils/bhajanRecord';
import { normalizeInputForStorage } from '../utils/transliteration';

const FORM_TEXT = {
  hindi: {
    title: '\u0928\u092F\u093E \u092D\u091C\u0928 \u091C\u094B\u095C\u0947\u0902',
    inputMode: '\u0932\u093F\u0916\u0928\u0947 \u0915\u093E \u0924\u0930\u0940\u0915\u093E',
    visibility: '\u092F\u0939 \u092D\u091C\u0928 \u0915\u093F\u0938\u0947 \u0926\u093F\u0916\u0947\u0917\u093E?',
    hindiInput: '\u0939\u093F\u0902\u0926\u0940',
    hinglishInput: '\u0939\u093F\u0902\u0917\u094D\u0932\u093F\u0936',
    publicOption: '\u0938\u092D\u0940 \u0915\u0947 \u0932\u093F\u090F',
    privateOption: '\u0938\u093F\u0930\u094D\u095E \u092E\u0947\u0930\u0947 \u0932\u093F\u090F',
    publicHelp: '\u092F\u0939 \u092D\u091C\u0928 \u0938\u0930\u094D\u0935\u0930 \u092A\u0930 \u0938\u0947\u0935 \u0939\u094B\u0915\u0930 \u0938\u092D\u0940 \u0915\u094B \u0926\u093F\u0916\u0947\u0917\u093E',
    privateHelp:
      '\u092F\u0939 \u092D\u091C\u0928 \u0938\u093F\u0930\u094D\u095E \u0907\u0938 \u092B\u094B\u0928 \u092F\u093E \u092C\u094D\u0930\u093E\u0909\u091C\u0930 \u092E\u0947\u0902 \u0930\u0939\u0947\u0917\u093E',
    name: '\u092D\u091C\u0928 \u0915\u093E \u0928\u093E\u092E *',
    lyrics: '\u092D\u091C\u0928 \u0915\u0947 \u0936\u092C\u094D\u0926 *',
    link: '\u092F\u0942\u091F\u094D\u092F\u0942\u092C \u0932\u093F\u0902\u0915 (\u090F\u091A\u094D\u091B\u093F\u0915)',
    namePlaceholder: '\u092D\u091C\u0928 \u0915\u093E \u0928\u093E\u092E \u0932\u093F\u0916\u0947\u0902',
    lyricsPlaceholder: '\u092D\u091C\u0928 \u0915\u0947 \u0936\u092C\u094D\u0926 \u0932\u093F\u0916\u0947\u0902',
    save: '\u0938\u0939\u0947\u091C\u0947\u0902',
    cancel: '\u0930\u0926\u094D\u0926 \u0915\u0930\u0947\u0902',
    nameError: '\u092D\u091C\u0928 \u0915\u093E \u0928\u093E\u092E \u091C\u0930\u0942\u0930\u0940 \u0939\u0948',
    lyricsError: '\u092D\u091C\u0928 \u0915\u0947 \u0936\u092C\u094D\u0926 \u091C\u0930\u0942\u0930\u0940 \u0939\u0948',
    preview: '\u092A\u094D\u0930\u0940\u0935\u094D\u092F\u0942'
  },
  hinglish: {
    title: 'Add New Bhajan',
    inputMode: 'Input script',
    visibility: 'Who should see this bhajan?',
    hindiInput: 'Hindi',
    hinglishInput: 'Hinglish',
    publicOption: 'Public',
    privateOption: 'Private',
    publicHelp: 'This bhajan will be saved to the server and visible to everyone',
    privateHelp: 'This bhajan will stay only on this phone or browser',
    name: 'Bhajan Name *',
    lyrics: 'Lyrics *',
    link: 'YouTube Link (Optional)',
    namePlaceholder: 'Enter bhajan name',
    lyricsPlaceholder: 'Enter bhajan lyrics',
    save: 'Save',
    cancel: 'Cancel',
    nameError: 'Bhajan name is required',
    lyricsError: 'Lyrics are required',
    preview: 'Preview'
  }
};

function AddBhajan({ onSave, onCancel, scriptMode }) {
  const [inputMode, setInputMode] = useState(scriptMode);
  const labels = FORM_TEXT[inputMode];
  const [formData, setFormData] = useState({
    name: '',
    Bhajan: '',
    link: '',
    visibility: 'public'
  });
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = labels.nameError;
    }
    if (!formData.Bhajan.trim()) {
      newErrors.Bhajan = labels.lyricsError;
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const preparedPreview = useMemo(() => {
    if (inputMode !== 'hinglish') {
      return null;
    }

    return {
      name: normalizeInputForStorage(formData.name, inputMode),
      Bhajan: normalizeInputForStorage(formData.Bhajan, inputMode)
    };
  }, [formData, inputMode]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!validate()) {
      return;
    }

    onSave(
      createBhajanPayload({
        name: formData.name,
        Bhajan: formData.Bhajan,
        link: formData.link,
        visibility: formData.visibility,
        inputMode
      })
    );
  };

  return (
    <div className="form">
      <h2 style={{ marginBottom: '20px', color: '#6200ea' }}>{labels.title}</h2>

      <div className="input-mode-panel">
        <span className="input-mode-label">{labels.inputMode}</span>
        <div className="script-toggle script-toggle-inline" role="tablist" aria-label="Input mode">
          <button
            type="button"
            className={`script-toggle-btn ${inputMode === 'hindi' ? 'active' : ''}`}
            onClick={() => setInputMode('hindi')}
          >
            {labels.hindiInput}
          </button>
          <button
            type="button"
            className={`script-toggle-btn ${inputMode === 'hinglish' ? 'active' : ''}`}
            onClick={() => setInputMode('hinglish')}
          >
            {labels.hinglishInput}
          </button>
        </div>
      </div>

      <div className="input-mode-panel">
        <span className="input-mode-label">{labels.visibility}</span>
        <div className="visibility-grid">
          <button
            type="button"
            className={`visibility-card ${formData.visibility === 'public' ? 'active' : ''}`}
            onClick={() => setFormData((prev) => ({ ...prev, visibility: 'public' }))}
          >
            <strong>{labels.publicOption}</strong>
            <span>{labels.publicHelp}</span>
          </button>
          <button
            type="button"
            className={`visibility-card ${formData.visibility === 'private' ? 'active' : ''}`}
            onClick={() => setFormData((prev) => ({ ...prev, visibility: 'private' }))}
          >
            <strong>{labels.privateOption}</strong>
            <span>{labels.privateHelp}</span>
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">{labels.name}</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder={labels.namePlaceholder}
          />
          {errors.name && <span style={{ color: '#f44336', fontSize: '12px' }}>{errors.name}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="Bhajan">{labels.lyrics}</label>
          <textarea
            id="Bhajan"
            name="Bhajan"
            value={formData.Bhajan}
            onChange={handleChange}
            placeholder={labels.lyricsPlaceholder}
          />
          {errors.Bhajan && (
            <span style={{ color: '#f44336', fontSize: '12px' }}>{errors.Bhajan}</span>
          )}
        </div>

        {inputMode === 'hinglish' && (formData.name || formData.Bhajan) && (
          <div className="preview-box">
            <h3>{labels.preview}</h3>
            <p className="preview-title">{preparedPreview?.name || ''}</p>
            <pre className="preview-text">{preparedPreview?.Bhajan || ''}</pre>
            <p className="preview-note">
              This Hindi preview is approximate. Your original Hinglish text will be saved as the source.
            </p>
          </div>
        )}

        <div className="form-group">
          <label htmlFor="link">{labels.link}</label>
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
          <button type="submit" className="btn btn-primary">
            {labels.save}
          </button>
          <button type="button" onClick={onCancel} className="btn btn-secondary">
            {labels.cancel}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddBhajan;

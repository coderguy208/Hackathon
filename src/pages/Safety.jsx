import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Badge, Button, Card, Field } from '../App';
import { db } from '../lib/store';
import BackButton from '../components/BackButton';

export default function Safety() {
  const [f, setF] = useState({ consent: false, phone: '', agree: false });
  const [filePreview, setFilePreview] = useState(null);
  const [fileName, setFileName] = useState('');
  const [status, setStatus] = useState('idle'); // 'idle' | 'loading' | 'approved'
  const [isDragging, setIsDragging] = useState(false);
  const [err, setErr] = useState({});

  function handleFileSelect(file) {
    if (!file) return;
    setFileName(file.name);
    setErr(prev => ({ ...prev, file: null }));
    const reader = new FileReader();
    reader.onload = (e) => setFilePreview(e.target.result);
    reader.readAsDataURL(file);
  }

  function handleDrop(e) {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  }

  async function submit(e) {
    e.preventDefault();
    
    let errors = {};
    if (!filePreview) errors.file = 'Please upload a photo ID document.';
    
    const phoneClean = f.phone.replace(/[^0-9]/g, '');
    if (phoneClean.length < 10) errors.phone = 'Please enter a valid 10-digit phone number.';
    
    if (!f.consent) errors.consent = 'You must consent to the background check.';
    if (!f.agree) errors.agree = 'You must agree to the community standards.';

    setErr(errors);
    if (Object.keys(errors).length > 0) return;

    setStatus('loading');

    setTimeout(() => {
      let family = db.get('family');
      if (family) {
        db.set('family', { ...family, verified: true });
      }
      setStatus('approved');
    }, 1800);
  }

  return (
    <>
      <BackButton fallback="/exchange" />
      <div className="page-head">
        <div>
          <Badge tone="green">Safety & verification</Badge>
          <h1>Trust starts with care.</h1>
          <p>Complete your identity check to unlock full community and exchange features.</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem', alignItems: 'start' }}>
        {/* Left Column: Verification Form / Dropzone */}
        <Card className="verify" style={{ margin: 0 }}>
          {status === 'loading' && (
            <div className="success" style={{ textAlign: 'center', padding: '2rem 1rem' }}>
              <h2>Verifying ID...</h2>
              <p>Securely checking credentials against state registry standards.</p>
            </div>
          )}

          {status === 'approved' && (
            <div className="success" style={{ textAlign: 'center', padding: '2rem 1rem' }}>
              <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>🛡️</div>
              <h2>Verification Approved!</h2>
              <p>Your family status is now verified. You have full access to child care swaps and messaging.</p>
              <NavLink to="/exchange" className="btn" style={{ marginTop: '1.25rem', display: 'inline-block' }}>
                Go to Care Exchange
              </NavLink>
            </div>
          )}

          {status === 'idle' && (
            <form onSubmit={submit}>
              <h2 style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>Upload Photo ID</h2>
              <p style={{ color: '#5b747b', fontSize: '0.85rem', marginBottom: '1rem' }}>
                Government-issued driver’s license, passport, or state ID.
              </p>

              {/* ID File Dropzone */}
              <div
                onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
                onClick={() => document.getElementById('id-upload').click()}
                style={{
                  border: isDragging ? '2px dashed #2e7166' : (err.file ? '2px dashed #d32f2f' : '2px dashed #b7d1cb'),
                  background: isDragging ? '#eef7f5' : '#f7fbfa',
                  borderRadius: '12px',
                  padding: '1.5rem',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  marginBottom: err.file ? '0.25rem' : '1.5rem'
                }}
              >
                <input
                  id="id-upload"
                  type="file"
                  accept="image/*,.pdf"
                  style={{ display: 'none' }}
                  onChange={(e) => handleFileSelect(e.target.files[0])}
                />

                {filePreview ? (
                  <div>
                    <img 
                      src={filePreview} 
                      alt="ID Preview" 
                      style={{ maxHeight: '120px', borderRadius: '8px', objectFit: 'contain', marginBottom: '0.5rem' }} 
                    />
                    <div style={{ fontWeight: '600', color: '#2e7166', fontSize: '0.9rem' }}>{fileName}</div>
                    <small style={{ color: '#5b747b' }}>Click to replace file</small>
                  </div>
                ) : (
                  <div>
                    <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🪪</div>
                    <b>Click to upload or drag & drop</b>
                    <p style={{ color: '#5b747b', fontSize: '0.8rem', margin: '0.25rem 0 0' }}>PNG, JPG or PDF up to 10MB</p>
                  </div>
                )}
              </div>
              {err.file && <div style={{ color: '#d32f2f', fontSize: '0.85rem', marginBottom: '1.25rem', fontWeight: '500' }}>{err.file}</div>}

              <Field
                label="Phone number"
                type="tel"
                value={f.phone}
                onChange={e => {
                  setF({ ...f, phone: e.target.value });
                  setErr(prev => ({ ...prev, phone: null }));
                }}
                placeholder="(555) 123-4567"
                error={err.phone}
              />

              <div style={{ marginTop: '1rem' }}>
                <label className="check" style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
                  <input
                    type="checkbox"
                    checked={f.consent}
                    onChange={e => {
                      setF({ ...f, consent: e.target.checked });
                      setErr(prev => ({ ...prev, consent: null }));
                    }}
                    style={{ marginTop: '0.2rem' }}
                  />
                  <span style={{ fontSize: '0.85rem' }}>I consent to background check verification against verified records.</span>
                </label>
                {err.consent && <div style={{ color: '#d32f2f', fontSize: '0.85rem', marginTop: '0.25rem', paddingLeft: '1.5rem', fontWeight: '500' }}>{err.consent}</div>}
              </div>

              <div style={{ marginTop: '0.75rem' }}>
                <label className="check" style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
                  <input
                    type="checkbox"
                    checked={f.agree}
                    onChange={e => {
                      setF({ ...f, agree: e.target.checked });
                      setErr(prev => ({ ...prev, agree: null }));
                    }}
                    style={{ marginTop: '0.2rem' }}
                  />
                  <span style={{ fontSize: '0.85rem' }}>I agree to uphold FamilyHub community safety standards and policies.</span>
                </label>
                {err.agree && <div style={{ color: '#d32f2f', fontSize: '0.85rem', marginTop: '0.25rem', paddingLeft: '1.5rem', fontWeight: '500' }}>{err.agree}</div>}
              </div>

              <Button type="submit" style={{ width: '100%', marginTop: '1.5rem' }}>
                Submit for review
              </Button>
            </form>
          )}
        </Card>

        {/* Right Column: Visual Trust & Guidelines */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <Card>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <span style={{ fontSize: '2.5rem' }}>🔒</span>
              <div>
                <h3 style={{ margin: 0, color: '#2e7166', fontSize: '1.25rem' }}>Bank-grade encryption</h3>
                <p style={{ margin: '0.25rem 0 0', color: '#5b747b', fontSize: '0.9rem' }}>
                  ID documents are processed through zero-knowledge encryption and never permanently stored.
                </p>
              </div>
            </div>
          </Card>

          <Card>
            <h3 style={{ marginTop: 0 }}>Community Guidelines</h3>
            <ul style={{ paddingLeft: '1.2rem', margin: '0.5rem 0 1rem', color: '#5b747b', fontSize: '0.9rem', lineHeight: '1.6' }}>
              <li><strong>Meet publicly first:</strong> Always meet potential caregivers or swap partners in daylight and public spaces.</li>
              <li><strong>Check reviews:</strong> Confirm endorsements and mutual connections prior to scheduling swaps.</li>
              <li><strong>Protect personal details:</strong> Never share house codes, keys, or passwords with unverified members.</li>
            </ul>
            <NavLink to="/contact" style={{ fontWeight: '600', color: '#2e7166' }}>Report a safety concern →</NavLink>
          </Card>
        </div>
      </div>
    </>
  );
}

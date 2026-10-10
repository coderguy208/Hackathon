import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Badge, Button, Card, Field } from '../App';
import { db } from '../lib/store';

export default function Safety() {
  const [f, setF] = useState({ id: false, consent: false, phone: '', agree: false });
  const [status, setStatus] = useState('idle'); // 'idle' | 'loading' | 'approved'

  async function submit(e) {
    e.preventDefault();
    
    // Basic validation: Check boxes and ensure phone has at least 10 characters
    if (!f.id || !f.consent || !f.agree) {
      return alert('Please check all agreement boxes.');
    }
    const phoneClean = f.phone.replace(/[^0-9]/g, '');
    if (phoneClean.length < 10) {
      return alert('Please enter a valid phone number with at least 10 digits.');
    }

    setStatus('loading');

    // Simulate network delay and instant admin approval for the demo
    setTimeout(() => {
      // Auto-verify the family in the local database to unlock the Exchange page
      let family = db.get('family');
      if (family) {
        db.set('family', { ...family, verified: true });
      }
      setStatus('approved');
    }, 2000);
  }

  return (
    <>
      <div className="page-head">
        <div>
          <Badge>Safety & verification</Badge>
          <h1>Trust starts with care.</h1>
          <p>Verification is a demo flow. Files are accepted locally and never uploaded.</p>
        </div>
      </div>
      <Card className="verify">
        {status === 'loading' && (
          <div className="success">
            <h2>Verifying...</h2>
            <p>Securely processing your information. Please wait.</p>
          </div>
        )}
        
        {status === 'approved' && (
          <div className="success">
            <h2>Verification Approved!</h2>
            <p>Your family is now verified. You can now access the Care Exchange.</p>
            <NavLink to="/exchange" className="btn" style={{ marginTop: '1rem' }}>Go to Care Exchange</NavLink>
          </div>
        )}

        {status === 'idle' && (
          <form onSubmit={submit}>
            <label className="check">
              <input type="checkbox" checked={f.id} onChange={e => setF({ ...f, id: e.target.checked })} /> I uploaded my photo ID (demo only — no file is stored)
            </label>
            <label className="check">
              <input type="checkbox" checked={f.consent} onChange={e => setF({ ...f, consent: e.target.checked })} /> I consent to a background check (demo feature)
            </label>
            
            <Field 
              label="Phone number" 
              type="tel"
              value={f.phone} 
              onChange={e => setF({ ...f, phone: e.target.value })} 
              placeholder="(555) 123-4567" 
            />
            
            <label className="check">
              <input type="checkbox" checked={f.agree} onChange={e => setF({ ...f, agree: e.target.checked })} /> I agree to the community safety agreement
            </label>
            <Button type="submit">Submit for review</Button>
          </form>
        )}
      </Card>
      <Card>
        <h2>Community guidelines</h2>
        <p>Be kind, protect private details, meet in public places first, and report concerns right away.</p>
        <p><NavLink to="/contact">Report a concern →</NavLink></p>
      </Card>
    </>
  );
}
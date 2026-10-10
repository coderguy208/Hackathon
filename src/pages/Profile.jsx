import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Badge, Button, Card, Field } from '../App';
import { db } from '../lib/store';

export default function Profile() {
  const nav = useNavigate();
  const s = db.get('session');
  const [f, setF] = useState(db.get('family') || { parents: s?.name || '', kids: '', city: '', type: 'single parent' });
  const [err, setErr] = useState({});

  if (!s) return null;

  async function save(e) {
    e.preventDefault();
    let x = {};
    ['parents', 'kids', 'city'].forEach(k => {
      if (!f[k].trim()) x[k] = 'This field is required.';
    });
    
    setErr(x);
    if (Object.keys(x).length) return;
    
    try {
      const response = await fetch('http://localhost:3000/api/family', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(f)
      });

      if (!response.ok) {
        setErr({ city: 'Failed to save profile to server.' });
        return;
      }

      const data = await response.json();
      
      // Update local store so un-migrated demo pages don't break
      db.set('family', { ...data.family, verified: db.get('family')?.verified || false });
      nav('/dashboard');
      
    } catch (error) {
      setErr({ city: 'Server connection failed.' });
    }
  }

  return (
    <div className="auth-wrap">
      <Card>
        <Badge tone="green">Your family profile</Badge>
        <h1>Let’s make this feel like home.</h1>
        <form onSubmit={save}>
          <Field label="Parent or guardian names" value={f.parents} onChange={e => setF({ ...f, parents: e.target.value })} error={err.parents} />
          <Field label="Kids — names and ages" placeholder="Sam (5), Jordan (9)" value={f.kids} onChange={e => setF({ ...f, kids: e.target.value })} error={err.kids} />
          <Field label="City or ZIP code" value={f.city} onChange={e => setF({ ...f, city: e.target.value })} error={err.city} />
          <label className="field">
            <span>Family type</span>
            <select value={f.type} onChange={e => setF({ ...f, type: e.target.value })}>
              {['single parent', 'two parents', 'extended family', 'other'].map(x => <option key={x}>{x}</option>)}
            </select>
          </label>
          <Button type="submit">Save and continue</Button>
        </form>
      </Card>
    </div>
  );
}
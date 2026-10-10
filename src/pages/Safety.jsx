import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Badge, Button, Card, Field } from '../App';
import { db } from '../lib/store';

export default function Safety() {
  const [f, setF] = useState({ id: false, consent: false, refs: '', agree: false });
  const [sent, setSent] = useState(false);

  function submit(e) {
    e.preventDefault();
    if (!f.id || !f.consent || !f.agree || !f.refs.trim()) {
      return alert('Please complete each safety step.');
    }
    db.set('verification', { ...f, status: 'pending' });
    setSent(true);
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
        {sent ? (
          <div className="success">
            <h2>Verification submitted</h2>
            <p>Your demo request is pending approval. Admin route: <code>/admin</code></p>
          </div>
        ) : (
          <form onSubmit={submit}>
            <label className="check">
              <input type="checkbox" checked={f.id} onChange={e => setF({ ...f, id: e.target.checked })} /> I uploaded my photo ID (demo only — no file is stored)
            </label>
            <label className="check">
              <input type="checkbox" checked={f.consent} onChange={e => setF({ ...f, consent: e.target.checked })} /> I consent to a background check (demo feature)
            </label>
            <Field label="Two references" value={f.refs} onChange={e => setF({ ...f, refs: e.target.value })} placeholder="Name and contact for each reference" />
            <label className="check">
              <input type="checkbox" checked={f.agree} onChange={e => setF({ ...f, agree: e.target.checked })} /> I agree to the community safety agreement
            </label>
            <Button>Submit for review</Button>
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
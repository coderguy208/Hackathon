import { useState } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import { Badge, Button, Card, Field } from '../App';
import { db } from '../lib/store';

export default function Info() {
  const { page } = useParams();

  if (page === 'settings') {
    return (
      <Card className="info">
        <Badge>Demo controls</Badge>
        <h1>Settings</h1>
        <p>Reset all browser-only FamilyHub demo data and start fresh.</p>
        <Button className="danger" onClick={() => { localStorage.clear(); window.location.href = '/'; }}>
          Reset demo data
        </Button>
      </Card>
    );
  }

  if (page === 'admin') {
    const [pass, setPass] = useState('');
    const verify = () => {
      if (pass !== 'familyhub-demo') return alert('Incorrect demo password.');
      let f = db.get('family');
      if (f) db.set('family', { ...f, verified: true });
      alert('Demo family approved and verified.');
    };
    
    return (
      <Card>
        <h1>Demo admin</h1>
        <p>Enter demo password <code>familyhub-demo</code> to approve the current family.</p>
        <Field label="Admin password" type="password" value={pass} onChange={e => setPass(e.target.value)} />
        <Button onClick={verify}>Approve verification</Button>
      </Card>
    );
  }

  const text = {
    about: ['About FamilyHub', 'FamilyHub brings schedules, trusted care, and your support network into one calm home base.'],
    faq: ['Frequently asked questions', 'Is this real? This hackathon demo uses only browser storage. Is care paid? Requests and payments are clearly simulated.'],
    contact: ['Contact & concern report', 'Tell us what happened. This demo keeps your report in your browser only.']
  }[page] || ['Page not found', ''];

  return (
    <Card className="info">
      <Badge>FamilyHub</Badge>
      <h1>{text[0]}</h1>
      <p>{text[1]}</p>
      {page === 'contact' && (
        <form onSubmit={e => { e.preventDefault(); alert('Your demo report was saved locally.'); }}>
          <Field label="Your message" required />
          <Button>Send report</Button>
        </form>
      )}
    </Card>
  );
}
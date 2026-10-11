import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Badge, Button, Card, Field } from '../App';
import { db } from '../lib/store';

export default function Auth() {
  const nav = useNavigate();
  const [mode, setMode] = useState('signup');
  const [f, setF] = useState({ name: '', email: '', password: '' });
  const [err, setErr] = useState({});

  async function submit(e) {
    e.preventDefault();
    let x = {};
    if (!f.email.includes('@')) x.email = 'Enter a valid email address.';
    if (f.password.length < 4) x.password = 'Use at least 4 characters.';
    if (mode === 'signup' && !f.name.trim()) x.name = 'Your name is required.';

    setErr(x);
    if (Object.keys(x).length) return;

    // Bypassing localhost fetch for static Vercel deployment
    const userToSave = {
      name: mode === 'signup' ? f.name : (f.email.split('@')[0] || 'Family'),
      email: f.email
    };

    db.set('session', userToSave);
    nav('/dashboard');
  }

  return (
    <div className="auth-wrap">
      <Card>
        <Badge>{mode === 'signup' ? 'Welcome' : 'Welcome back'}</Badge>
        <h1>{mode === 'signup' ? 'Make space for what matters.' : 'Good to see you.'}</h1>
        <form onSubmit={submit}>
          <Field hidden={mode === 'login'} label="Your name" value={f.name} onChange={e => setF({ ...f, name: e.target.value })} error={err.name} />
          <Field label="Email address" type="email" value={f.email} onChange={e => setF({ ...f, email: e.target.value })} error={err.email} />
          <Field label="Password" type="password" value={f.password} onChange={e => setF({ ...f, password: e.target.value })} error={err.password} />
          <Button type="submit">{mode === 'signup' ? 'Create account' : 'Log in'}</Button>
        </form>
        <div style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.95rem', color: '#5b747b' }}>
          {mode === 'signup' ? 'Already have an account?' : 'New here?'}{' '}
          <button
            className="link"
            type="button"
            style={{ fontWeight: '600' }}
            onClick={() => setMode(mode === 'signup' ? 'login' : 'signup')}
          >
            {mode === 'signup' ? 'Log in' : 'Create one'}
          </button>
        </div>
      </Card>
    </div>
  );
}
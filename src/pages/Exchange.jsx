import { useState } from 'react';
import { Badge, Button, Card, Field, Modal } from '../App';
import { clean, db } from '../lib/store';

export default function Caregivers() {
  const [list] = useState(db.get('caregivers', []));
  const [filter, setFilter] = useState({ price: 30, distance: 10 });
  const [chosen, setChosen] = useState(null);
  const [backup, setBackup] = useState(db.get('backup', []));

  const shown = list.filter(c => c.rate <= filter.price && c.distance <= filter.distance);

  function toggle(c) {
    const a = backup.includes(c.id) ? backup.filter(x => x !== c.id) : [...backup, c.id];
    setBackup(a);
    db.set('backup', a);
  }

  return (
    <>
      <div className="page-head">
        <div>
          <Badge>Caregiver directory</Badge>
          <h1>Care you can count on.</h1>
          <p>Meet experienced, community-reviewed caregivers near you.</p>
        </div>
      </div>
      
      {/* Filters spaced out horizontally */}
      <Card className="filters" style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', alignItems: 'center', marginBottom: '2rem', padding: '1.5rem' }}>
        <label style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', flex: 1, minWidth: '200px' }}>
          <b style={{ color: '#2e7166' }}>Up to ${filter.price}/hr</b>
          <input type="range" min="15" max="30" value={filter.price} onChange={e => setFilter({ ...filter, price: +e.target.value })} />
        </label>
        <label style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', flex: 1, minWidth: '200px' }}>
          <b style={{ color: '#2e7166' }}>Within {filter.distance} miles</b>
          <input type="range" min="1" max="10" value={filter.distance} onChange={e => setFilter({ ...filter, distance: +e.target.value })} />
        </label>
        <div style={{ flex: 1, minWidth: '200px', color: '#5b747b' }}>
          <b style={{ display: 'block', marginBottom: '0.25rem', color: '#333' }}>Availability:</b> All times
        </div>
      </Card>

      <div className="care-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
        {shown.map(c => (
          <Card className="care-card" key={c.id} style={{ display: 'flex', flexDirection: 'column', height: '100%', padding: '1.5rem' }}>
            
            {/* Header: Avatar and Badge */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
              <div className="avatar" style={{ width: '3.5rem', height: '3.5rem', borderRadius: '50%', background: '#e6f0ed', color: '#2e7166', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.25rem', fontWeight: 'bold' }}>
                {c.name.split(' ').map(x => x[0]).join('')}
              </div>
              <Badge tone="green">✓ Verified</Badge>
            </div>
            
            {/* Profile Info */}
            <h2 style={{ margin: '0 0 0.25rem 0', fontSize: '1.25rem' }}>{c.name}</h2>
            <p style={{ margin: '0 0 1rem 0', color: '#5b747b', fontSize: '0.9rem' }}>★ {c.rating} · {c.distance} mi away</p>
            <p style={{ margin: '0 0 1.5rem 0', flex: 1, fontSize: '0.95rem', lineHeight: '1.5' }}>{c.bio}</p>
            
            {/* Meta Data Box */}
            <div className="care-meta" style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', background: '#f7fbfa', borderRadius: '8px', border: '1px solid #eef7f5', marginBottom: '1rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '0.75rem', color: '#5b747b', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.25rem' }}>Rate</span>
                <b>${c.rate}/hr</b>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'right' }}>
                <span style={{ fontSize: '0.75rem', color: '#5b747b', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.25rem' }}>Experience</span>
                <b>{c.ages} years</b>
              </div>
            </div>
            
            <small style={{ display: 'block', color: '#5b747b', marginBottom: '1.5rem' }}>Available: {c.availability}</small>
            
            {/* Buttons pushed to bottom */}
            <div className="actions" style={{ display: 'flex', gap: '0.75rem', marginTop: 'auto' }}>
              <Button style={{ flex: 1, padding: '0.5rem' }} onClick={() => setChosen(c)}>Request care</Button>
              <Button 
                className={backup.includes(c.id) ? 'quiet' : ''} 
                style={{ 
                  flex: 1,
                  padding: '0.5rem',
                  border: backup.includes(c.id) ? '1.5px solid #2e7166' : '1.5px solid transparent',
                  color: backup.includes(c.id) ? '#2e7166' : '#ffffff',
                  backgroundColor: backup.includes(c.id) ? 'transparent' : '#2e7166'
                }} 
                onClick={() => toggle(c)}
              >
                {backup.includes(c.id) ? 'Saved' : 'Save backup'}
              </Button>
            </div>
          </Card>
        ))}
      </div>
      
      {!shown.length && (
        <Card style={{ textAlign: 'center', padding: '3rem' }}>
          <p className="empty" style={{ color: '#5b747b', fontSize: '1.1rem' }}>No caregivers match those filters. Try widening your search radius or rate.</p>
        </Card>
      )}
      {chosen && <RequestModal caregiver={chosen} onClose={() => setChosen(null)} />}
    </>
  );
}

function RequestModal({ caregiver, onClose }) {
  const [note, setNote] = useState('');
  const [done, setDone] = useState(false);

  function send(e) {
    e.preventDefault();
    db.set('requests', [...db.get('requests', []), { id: crypto.randomUUID(), caregiver: caregiver.name, note: clean(note), status: 'pending' }]);
    setDone(true);
  }

  return (
    <Modal title={'Request care from ' + caregiver.name} onClose={onClose}>
      {done ? (
        <div className="success" style={{ textAlign: 'center', padding: '1rem 0' }}>
          <h3 style={{ color: '#2e7166' }}>Request sent!</h3>
          <p style={{ color: '#5b747b', marginBottom: '1.5rem' }}>Your request is pending. This demo does not take payment.</p>
          <Button onClick={onClose} style={{ width: '100%' }}>Done</Button>
        </div>
      ) : (
        <form onSubmit={send}>
          <p style={{ color: '#5b747b', marginBottom: '1.5rem' }}>Share the basics and questions for your caregiver.</p>
          <Field label="A note for your caregiver" value={note} onChange={e => setNote(e.target.value)} placeholder="Looking for help Thursday evening…" />
          <Button style={{ width: '100%', marginTop: '1rem' }}>Send request</Button>
        </form>
      )}
    </Modal>
  );
}
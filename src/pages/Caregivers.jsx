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
      <Card className="filters">
        <label>
          Up to ${filter.price}/hr
          <input type="range" min="15" max="30" value={filter.price} onChange={e => setFilter({ ...filter, price: +e.target.value })} />
        </label>
        <label>
          Within {filter.distance} miles
          <input type="range" min="1" max="10" value={filter.distance} onChange={e => setFilter({ ...filter, distance: +e.target.value })} />
        </label>
        <span>Availability: all times</span>
      </Card>
      <div className="care-grid">
        {shown.map(c => (
          <Card className="care-card" key={c.id}>
            <div className="avatar">{c.name.split(' ').map(x => x[0]).join('')}</div>
            <Badge tone="green">✓ Verified</Badge>
            <h2>{c.name}</h2>
            <p>★ {c.rating} · {c.distance} mi away</p>
            <p>{c.bio}</p>
            <div className="care-meta">
              <b>${c.rate}/hour</b>
              <span>{c.ages} years</span>
            </div>
            <small>Available: {c.availability}</small>
            <div className="actions">
              <Button onClick={() => setChosen(c)}>Request care</Button>
              <button className="link" onClick={() => toggle(c)}>
                {backup.includes(c.id) ? '★ Backup caregiver' : '☆ Save backup'}
              </button>
            </div>
          </Card>
        ))}
      </div>
      {!shown.length && (
        <Card>
          <p className="empty">No caregivers match those filters. Try widening your search.</p>
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
        <div className="success">
          <h3>Request sent!</h3>
          <p>Your request is pending. This demo does not take payment.</p>
          <Button onClick={onClose}>Done</Button>
        </div>
      ) : (
        <form onSubmit={send}>
          <p>Share the basics and questions for your caregiver.</p>
          <Field label="A note for your caregiver" value={note} onChange={e => setNote(e.target.value)} placeholder="Looking for help Thursday evening…" />
          <Button>Send request</Button>
        </form>
      )}
    </Modal>
  );
}
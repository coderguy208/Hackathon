import { useState } from 'react';
import { Badge, Button, Card, Field, Modal } from '../App';
import { clean, db } from '../lib/store';

const cats = { work: '#5286c1', school: '#6f9f86', health: '#d17d65', family: '#c49448', event: '#8b77bf' };

export default function Dashboard() {
  const [events, setEvents] = useState(db.get('events', []));
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [view, setView] = useState('week');

  const save = x => {
    let all = editing ? events.map(e => e.id === x.id ? x : e) : [...events, x];
    db.set('events', all);
    setEvents(all);
    setOpen(false);
  };

  return (
    <>
      <div className="page-head">
        <div>
          <Badge tone="green">Family schedule</Badge>
          <h1>Good morning, {db.get('session').name.split(' ')[0]}.</h1>
          <p>Here’s the week ahead — you’ve got this.</p>
        </div>
        <Button onClick={() => { setEditing(null); setOpen(true); }}>+ Add to schedule</Button>
      </div>
      <div className="dashboard">
        <Card className="calendar">
          <div className="calendar-top">
            <h2>{view === 'week' ? 'This week' : 'October 2026'}</h2>
            <div>
              <Button className={'small ' + (view === 'week' ? 'active' : '')} onClick={() => setView('week')}>Week</Button>
              <Button className={'small ' + (view === 'month' ? 'active' : '')} onClick={() => setView('month')}>Month</Button>
            </div>
          </div>
          <div className={view === 'week' ? 'week-grid' : 'month-grid'}>
            {(view === 'week' ? ['Mon 5', 'Tue 6', 'Wed 7', 'Thu 8', 'Fri 9', 'Sat 10', 'Sun 11'] : Array.from({ length: 31 }, (_, i) => i + 1)).map((day, i) => (
              <div className="day" key={day}>
                <b>{day}</b>
                {events.filter(e => view === 'week' ? e.day === i : e.date.endsWith(String(day).padStart(2, '0'))).map(e => (
                  <button className="event" style={{ borderLeftColor: cats[e.category] }} key={e.id} onClick={() => { setEditing(e); setOpen(true); }}>
                    {e.title}{e.care && <small> Care needed</small>}
                  </button>
                ))}
              </div>
            ))}
          </div>
        </Card>
        <Card className="reminders">
          <Badge>THIS WEEK</Badge>
          <h2>A few reminders</h2>
          {events.filter(e => e.care || e.category === 'health').map(e => (
            <div className="reminder" key={e.id}>
              <span style={{ background: cats[e.category] }} />
              <div>
                <b>{e.title}</b>
                <small>{e.date} · {e.time}</small>
              </div>
            </div>
          ))}
          {!events.length && <p className="empty">No events yet. Add one above.</p>}
        </Card>
      </div>
      {open && <EventModal event={editing} onClose={() => setOpen(false)} onSave={save} onDelete={id => {
        let a = events.filter(e => e.id !== id);
        db.set('events', a);
        setEvents(a);
      }} />}
    </>
  );
}

function EventModal({ event, onClose, onSave, onDelete }) {
  const [f, setF] = useState(event || { id: crypto.randomUUID(), title: '', date: '2026-10-06', time: '09:00', category: 'work', care: false, recurring: 'none', day: 0 });
  const [error, setError] = useState('');

  function submit(e) {
    e.preventDefault();
    if (!f.title.trim()) return setError('Please add a title.');
    const d = new Date(f.date + 'T12:00').getDay();
    onSave({ ...f, title: clean(f.title), day: d ? d - 1 : 6 });
  }

  return (
    <Modal title={event ? 'Edit event' : 'Add to schedule'} onClose={onClose}>
      <form onSubmit={submit}>
        <Field label="What’s happening?" value={f.title} onChange={e => setF({ ...f, title: e.target.value })} error={error} />
        <div className="split">
          <Field label="Date" type="date" value={f.date} onChange={e => setF({ ...f, date: e.target.value })} />
          <Field label="Time" type="time" value={f.time} onChange={e => setF({ ...f, time: e.target.value })} />
        </div>
        <label className="field">
          <span>Category</span>
          <select value={f.category} onChange={e => setF({ ...f, category: e.target.value })}>
            {Object.keys(cats).map(x => <option key={x}>{x}</option>)}
          </select>
        </label>
        <label className="check">
          <input type="checkbox" checked={f.care} onChange={e => setF({ ...f, care: e.target.checked })} /> Care needed
        </label>
        <label className="field">
          <span>Repeat</span>
          <select value={f.recurring} onChange={e => setF({ ...f, recurring: e.target.value })}>
            <option value="none">Does not repeat</option>
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
          </select>
        </label>
        <div className="actions">
          <Button>Save event</Button>
          {event && <Button type="button" className="danger" onClick={() => { onDelete(event.id); onClose(); }}>Delete</Button>}
        </div>
      </form>
    </Modal>
  );
}
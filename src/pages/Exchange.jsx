import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Badge, Button, Card, Field } from '../App';
import { clean, db } from '../lib/store';

export default function Exchange() {
  const family = db.get('family');
  const [items, setItems] = useState(db.get('exchanges', []));
  const [type, setType] = useState('need');
  const [message, setMessage] = useState('');

  if (!family?.verified) {
    return (
      <section className="locked">
        <Badge>Verification needed</Badge>
        <h1>Care exchange is for verified families.</h1>
        <p>Complete a short safety check to see local exchanges and message other families.</p>
        <NavLink className="btn" to="/safety">Get verified</NavLink>
      </section>
    );
  }

  function add(e) {
    e.preventDefault();
    let a = [
      {
        id: crypto.randomUUID(),
        author: family.parents,
        type,
        area: family.city,
        date: '2026-10-10',
        time: 'Flexible',
        age: 'All ages',
        body: clean(message)
      },
      ...items
    ];
    setItems(a);
    db.set('exchanges', a);
    setMessage('');
  }

  return (
    <>
      <div className="page-head">
        <div>
          <Badge tone="green">Verified care exchange</Badge>
          <h1>Neighbors helping neighbors.</h1>
          <p>Match on time and area before agreeing — conversation stays in app.</p>
        </div>
      </div>
      <Card>
        <form onSubmit={add}>
          <div className="split">
            <label className="field">
              <span>I want to</span>
              <select value={type} onChange={e => setType(e.target.value)}>
                <option value="need">Find care</option>
                <option value="offer">Offer help</option>
              </select>
            </label>
            <Field label="Details" value={message} onChange={e => setMessage(e.target.value)} placeholder="Date, time, area…" />
          </div>
          <Button>Post to exchange</Button>
        </form>
      </Card>
      <div className="exchange-grid">
        {items.map(x => (
          <Card key={x.id}>
            <Badge tone={x.type === 'need' ? 'blue' : 'green'}>
              {x.type === 'need' ? 'Needs care' : 'Can help'}
            </Badge>
            <h2>{x.author}</h2>
            <p>{x.body}</p>
            <p><b>{x.date}</b> · {x.time}<br />{x.area} · children {x.age}</p>
            <Button className="small" onClick={() => alert('Demo message opened. In production, this would be a private in-app conversation.')}>
              Message family
            </Button>
          </Card>
        ))}
      </div>
    </>
  );
}
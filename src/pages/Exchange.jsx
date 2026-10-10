import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Badge, Button, Card, Field } from '../App';
import { clean, db } from '../lib/store';

export default function Exchange() {
  const family = db.get('family');
  const [items, setItems] = useState(db.get('exchanges', []));
  const [type, setType] = useState('need');
  const [message, setMessage] = useState('');
  
  // New state variables for location API
  const [zip, setZip] = useState('');
  const [locationStr, setLocationStr] = useState('');
  const [fetching, setFetching] = useState(false);

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

  // The API fetch function
  async function handleZipChange(e) {
    const val = e.target.value.replace(/[^0-9]/g, '');
    setZip(val);
    
    if (val.length === 5) {
      setFetching(true);
      try {
        const res = await fetch(`https://api.zippopotam.us/us/${val}`);
        if (res.ok) {
          const data = await res.json();
          const city = data.places[0]['place name'];
          const state = data.places[0]['state abbreviation'];
          setLocationStr(`${city}, ${state}`);
        } else {
          setLocationStr('Invalid ZIP');
        }
      } catch (err) {
        setLocationStr('API Error');
      } finally {
        setFetching(false);
      }
    } else {
      setLocationStr('');
    }
  }

  function add(e) {
    e.preventDefault();
    if (!locationStr || locationStr === 'Invalid ZIP' || locationStr === 'API Error') {
      return alert('Please enter a valid ZIP code to set your area.');
    }

    let a = [
      {
        id: crypto.randomUUID(),
        author: family.parents,
        type,
        area: locationStr, // Uses the API-fetched string
        date: new Date().toLocaleDateString(),
        time: 'Flexible',
        age: 'All ages',
        body: clean(message)
      },
      ...items
    ];
    setItems(a);
    db.set('exchanges', a);
    setMessage('');
    setZip('');
    setLocationStr('');
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
            <Field label="Details" value={message} onChange={e => setMessage(e.target.value)} placeholder="Date, time, requirements…" />
          </div>
          
          <div className="split" style={{ marginTop: '15px' }}>
            <Field 
              label="Area ZIP Code" 
              value={zip} 
              onChange={handleZipChange} 
              placeholder="e.g. 85281" 
              maxLength="5"
            />
            <div className="field">
              <span>Detected Area</span>
              <div style={{ padding: '11px', background: '#f4f8fa', borderRadius: '9px', minHeight: '44px', color: '#5b747b' }}>
                {fetching ? 'Fetching area...' : (locationStr || 'Enter 5-digit ZIP')}
              </div>
            </div>
          </div>
          
          <Button style={{ marginTop: '15px' }}>Post to exchange</Button>
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
            <p><b>{x.date}</b> · {x.time}<br />📍 {x.area} · children {x.age}</p>
            <Button className="small" onClick={() => alert('Demo message opened.')}>
              Message family
            </Button>
          </Card>
        ))}
      </div>
    </>
  );
}
import { NavLink } from 'react-router-dom';
import { Badge, Card } from '../App';

export default function Landing() {
  return (
    <>
      <section className="hero">
        <div>
          <Badge tone="green">Family life, made lighter</Badge>
          <h1>Everything your family needs, in one place</h1>
          <p>Coordinate the week, find trusted care, and build the village that helps your family thrive.</p>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '1rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <NavLink className="btn" to="/exchange">ChildcareSwap</NavLink>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <NavLink className="btn quiet" style={{ flex: 1, padding: '0.25rem 0.5rem', fontSize: '0.875rem' }} to="/exchange?role=parent">Parents</NavLink>
                <NavLink className="btn quiet" style={{ flex: 1, padding: '0.25rem 0.5rem', fontSize: '0.875rem' }} to="/exchange?role=volunteer">Volunteers</NavLink>
              </div>
            </div>
            <NavLink className="btn" style={{ alignSelf: 'flex-start' }} to="/network">Networking</NavLink>
          </div>
        </div>
        <div className="hero-art">
          <div className="orb one" />
          <div className="orb two" />
          <div className="mini-card">☀️ <b>Soccer pickup</b><small>Today · 4:30 PM</small></div>
          <div className="mini-card second">✓ <b>Care request accepted</b><small>By Maya R.</small></div>
        </div>
      </section>
      <section className="feature-grid">
        {[
          ['▦', 'Shared schedule', 'Work, school, appointments, and care needs — clearly together.'],
          ['♡', 'Trusted caregivers', 'Get to know vetted care nearby, before you need it.'],
          ['◌', 'Your family network', 'Share wisdom and build meaningful local connections.']
        ].map(x => (
          <Card key={x[1]}>
            <i>{x[0]}</i>
            <h3>{x[1]}</h3>
            <p>{x[2]}</p>
          </Card>
        ))}
      </section>
      <section className="safety-callout">
        <div>
          <Badge>Safety first</Badge>
          <h2>Built around trust, not just convenience.</h2>
          <p>Clear verification steps, community standards, and control over your family’s information.</p>
        </div>
        <NavLink to="/safety">How safety works →</NavLink>
      </section>
    </>
  );
}
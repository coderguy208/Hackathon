import { NavLink } from 'react-router-dom';
import { Badge, Card } from '../App';

export default function Landing() {
  return (
    <>
      <section className="hero">
        <div>
          <Badge tone="green">Family life, made lighter</Badge>
          <h1>Everything your family needs, in one place</h1>
          <p>Coordinate the week, find trusted care, and build the village that helps your family thrive. Clear verification steps, community standards, and control over your family’s information.</p>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', marginTop: '1.5rem' }}>
            <NavLink to="/exchange" style={{ textDecoration: 'none', color: 'inherit' }}>
              <Card style={{ height: '100%', display: 'flex', flexDirection: 'column', padding: '1.5rem', background: '#ffffff', border: '1px solid #d1e3df', boxShadow: '0 4px 12px rgba(46, 113, 102, 0.05)' }}>
                <Badge tone="blue">Child Care</Badge>
                <h2 style={{ fontSize: '1.25rem', marginTop: '1rem', marginBottom: '0.5rem' }}>Trade time.<br/>Save money.</h2>
                <p style={{ color: '#5b747b', fontSize: '0.9rem', marginBottom: '1rem', flex: 1 }}>Exchange care hours with verified parents seamlessly. You need a sitter; they need a break. Win-win.</p>
                <div style={{ fontWeight: 'bold', color: '#2e7166', fontSize: '0.9rem' }}>Explore the swap →</div>
              </Card>
            </NavLink>

            <NavLink to="/network" style={{ textDecoration: 'none', color: 'inherit' }}>
              <Card style={{ height: '100%', display: 'flex', flexDirection: 'column', padding: '1.5rem', background: '#ffffff', border: '1px solid #d8e5ee', boxShadow: '0 4px 12px rgba(53, 107, 148, 0.05)' }}>
                <Badge tone="green">Local Community</Badge>
                <h2 style={{ fontSize: '1.25rem', marginTop: '1rem', marginBottom: '0.5rem' }}>Find your<br/>village.</h2>
                <p style={{ color: '#5b747b', fontSize: '0.9rem', marginBottom: '1rem', flex: 1 }}>Connect with local families, join parenting groups, share advice, and organize neighborhood playdates.</p>
                <div style={{ fontWeight: 'bold', color: '#356b94', fontSize: '0.9rem' }}>Join the community →</div>
              </Card>
            </NavLink>
          </div>
        </div>
        <div className="hero-art" style={{ minHeight: '450px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div className="orb one" />
          <div className="orb two" />
          <div className="mini-card">☀️ <b>Soccer pickup</b><small>Today · 4:30 PM</small></div>
          <div className="mini-card second">✓ <b>Care request accepted</b><small>By Maya R.</small></div>
        </div>
      </section>
      
      <section className="safety-callout" style={{ margin: '3rem 0', padding: '1.5rem 2.5rem', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <Badge>Safety first</Badge>
          <h2 style={{ margin: 0, fontSize: '1.25rem' }}>Built around trust, not just convenience.</h2>
        </div>
        <NavLink to="/safety" style={{ fontWeight: 'bold', whiteSpace: 'nowrap' }}>Verify now! →</NavLink>
      </section>

      <section className="feature-grid">
        {[
          ['▦', 'Shared schedule', 'Work, school, appointments, and care needs — clearly together.'],
          ['♡', 'Trusted caregivers', 'Get to know vetted care nearby, before you need it.'],
          ['◌', 'Your family community', 'Share wisdom and build meaningful local connections.']
        ].map(x => (
          <Card key={x[1]}>
            <i>{x[0]}</i>
            <h3>{x[1]}</h3>
            <p>{x[2]}</p>
          </Card>
        ))}
      </section>
    </>
  );
}
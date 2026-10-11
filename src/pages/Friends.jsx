import { useState } from 'react';
import { Badge, Button, Card } from '../App';
import { db } from '../lib/store';

export default function Friends() {
  // Initialize with demo data if empty
  const [friends, setFriends] = useState(db.get('friends', [
    { id: crypto.randomUUID(), name: 'Maya R.', mutuals: 3, status: 'Online' },
    { id: crypto.randomUUID(), name: 'Jordan & Kai', mutuals: 12, status: 'Offline' },
    { id: crypto.randomUUID(), name: 'Sam T.', mutuals: 1, status: 'Online' }
  ]));

  function removeFriend(id) {
    const updated = friends.filter(f => f.id !== id);
    setFriends(updated);
    db.set('friends', updated);
  }

  return (
    <>
      <div className="page-head">
        <div>
          <Badge tone="blue">Your Network</Badge>
          <h1>Friend List</h1>
          <p>Families you have connected with on FamilyHub.</p>
        </div>
      </div>
      
      <div style={{ display: 'grid', gap: '15px' }}>
        {friends.map(friend => (
          <Card key={friend.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <div className="avatar">
                {friend.name.split(' ').map(x => x[0]).join('').substring(0, 2)}
              </div>
              <div>
                <h3 style={{ margin: '0 0 5px 0' }}>{friend.name}</h3>
                <small style={{ color: '#5b747b' }}>
                  {friend.mutuals} mutual connections · 
                  <span style={{ color: friend.status === 'Online' ? '#28715b' : '#71878a', marginLeft: '5px' }}>
                    {friend.status === 'Online' ? '● Online' : '○ Offline'}
                  </span>
                </small>
              </div>
            </div>
            <div className="actions">
              <Button className="small" onClick={() => alert(`Messaging ${friend.name}...`)}>Message</Button>
              <Button className="small quiet danger" onClick={() => removeFriend(friend.id)}>Remove</Button>
            </div>
          </Card>
        ))}
        
        {friends.length === 0 && (
          <Card>
            <p className="empty">Your friend list is empty. Visit the Network tab to find local families.</p>
          </Card>
        )}
      </div>
    </>
  );
}
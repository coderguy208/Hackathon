import { useState } from 'react';
import { Badge, Button, Card } from '../App';
import { clean, db } from '../lib/store';

export default function Network() {
  const [groups, setGroups] = useState(db.get('groups', []));
  const [posts, setPosts] = useState(db.get('posts', []));
  const [text, setText] = useState('');

  function post(e) {
    e.preventDefault();
    if (!text.trim()) return;
    const a = [{ id: crypto.randomUUID(), author: db.get('session').name, group: 'Working Parents', body: clean(text), likes: 0, comments: [] }, ...posts];
    setPosts(a);
    db.set('posts', a);
    setText('');
  }

  function group(id) {
    let a = groups.map(g => g.id === id ? { ...g, joined: !g.joined } : g);
    setGroups(a);
    db.set('groups', a);
  }

  return (
    <>
      <div className="page-head">
        <div>
          <Badge tone="green">Family community</Badge>
          <h1>Your village is here.</h1>
          <p>Helpful ideas and friendly faces from families nearby.</p>
        </div>
      </div>
      <div className="network">
        <aside>
          <Card>
            <h3>Community groups</h3>
            {groups.map(g => (
              <div className="group" key={g.id}>
                <span>
                  <b>{g.name}</b>
                  <small>{g.members} families</small>
                </span>
                <button className="link" onClick={() => group(g.id)}>{g.joined ? 'Leave' : 'Join'}</button>
              </div>
            ))}
          </Card>
          <Card>
            <h3>Nearby families</h3>
            <p>Jordan & Kai · 1.2 mi</p>
            <Button className="small">Follow</Button>
          </Card>
        </aside>
        <div>
          <Card>
            <form onSubmit={post}>
              <label className="field">
                <span>Share with your community</span>
                <textarea value={text} onChange={e => setText(e.target.value)} placeholder="Ask a question or share a win…" />
              </label>
              <Button type="submit">Post update</Button>
            </form>
          </Card>
          {posts.map(p => (
            <Card className="post" key={p.id}>
              <Badge>{p.group}</Badge>
              <h3>{p.author}</h3>
              <p>{p.body}</p>
              <button className="link" onClick={() => {
                let a = posts.map(x => x.id === p.id ? { ...x, likes: x.likes + 1 } : x);
                setPosts(a);
                db.set('posts', a);
              }}>
                ♡ {p.likes} likes
              </button>
              {p.comments.map((c, i) => (
                <p className="comment" key={i}>
                  <b>{c.author}</b> {c.body}
                </p>
              ))}
            </Card>
          ))}
        </div>
      </div>
    </>
  );
}
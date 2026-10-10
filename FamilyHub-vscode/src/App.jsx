import {BrowserRouter, Routes, Route, NavLink, Navigate, useNavigate} from 'react-router-dom';
import {useState} from 'react';
import {APP_NAME, db, seedDemoData} from './lib/store';
import {Landing, Auth, Profile, Dashboard, Caregivers, Network, Exchange, Safety, Info} from './pages';
import './index.css';

export function Button({children,className='',...props}){return <button className={'btn '+className} {...props}>{children}</button>}
export function Card({children,className=''}){return <section className={'card '+className}>{children}</section>}
export function Badge({children,tone='blue'}){return <span className={'badge '+tone}>{children}</span>}
export function Field({label,error,hidden,...props}){if(hidden)return null;return <label className="field"><span>{label}</span><input {...props}/>{error&&<small className="error">{error}</small>}</label>}
export function Modal({title,children,onClose}){return <div className="scrim" role="dialog" aria-modal="true"><div className="modal"><button className="close" onClick={onClose} aria-label="Close">×</button><h2>{title}</h2>{children}</div></div>}
function Header(){const [user,setUser]=useState(db.get('session'));const nav=useNavigate();const logout=()=>{db.set('session',null);setUser(null);nav('/')};return <><header><NavLink to="/" className="brand"><img src="/family-circle-12.svg"/><span>{APP_NAME}</span></NavLink><nav>{user&&['/dashboard','/caregivers','/network','/exchange'].map(p=><NavLink key={p} to={p}>{p.slice(1).replace(/^./,x=>x.toUpperCase())}</NavLink>)}<NavLink to="/about">About</NavLink><NavLink to="/settings">Settings</NavLink></nav><div>{user?<><span className="hello">Hi, {user.name.split(' ')[0]}</span><Button className="quiet" onClick={logout}>Log out</Button></>:<NavLink className="login" to="/auth">Log in</NavLink>}</div></header></>}
function Layout({children}){return <><Header/><main>{children}</main><footer>© 2026 {APP_NAME} · <NavLink to="/faq">FAQ</NavLink> · <NavLink to="/contact">Contact</NavLink> · <NavLink to="/safety">Safety</NavLink></footer></>}
function Required({children}){return db.get('session')?children:<Navigate to="/auth"/>}
export default function App(){seedDemoData();return <BrowserRouter><Layout><Routes><Route path="/" element={<Landing/>}/><Route path="/auth" element={<Auth/>}/><Route path="/profile" element={<Profile/>}/><Route path="/dashboard" element={<Required><Dashboard/></Required>}/><Route path="/caregivers" element={<Required><Caregivers/></Required>}/><Route path="/network" element={<Required><Network/></Required>}/><Route path="/exchange" element={<Required><Exchange/></Required>}/><Route path="/safety" element={<Safety/>}/><Route path="/:page" element={<Info/>}/><Route path="*" element={<Navigate to="/"/>}/></Routes></Layout></BrowserRouter>}

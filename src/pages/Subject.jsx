import React, { useEffect, useState } from 'react'
import EntryList from '../components/EntryList'
import { loadUserData, saveUserData } from '../lib/storage'


export default function SubjectPage({user, subjectId, onBack}){
const [data, setData] = useState(()=> loadUserData(user.uid))
const subj = data.subjects.find(s=>s.id===subjectId)
useEffect(()=>{ saveUserData(user.uid, data) },[data,user])
if(!subj) return <div className="container">Subject not found <button onClick={onBack}>Back</button></div>
function addEntry(){ const title = prompt('Entry title (course/book/etc.)'); if(!title) return; const e = { id:'e_'+Math.random().toString(36).slice(2,9), title, type:'course', source:'', notes:'', startDate:'', doneDate:'', chapters:[] }; setData(d=> ({ subjects: d.subjects.map(s=> s.id===subj.id? {...s, entries:[e, ...(s.entries||[])] } : s) })) }
function editEntry(entry){ const title = prompt('Edit entry title', entry.title); if(!title) return; setData(d=> ({ subjects: d.subjects.map(s=> s.id===subj.id? {...s, entries: s.entries.map(en=> en.id===entry.id? {...en, title} : en) } : s) })) }
function deleteEntry(entry){ if(!confirm('Delete?')) return; setData(d=> ({ subjects: d.subjects.map(s=> s.id===subj.id? {...s, entries: s.entries.filter(en=> en.id!==entry.id) } : s) })) }
function openEntry(entry){ // open details modal
const notes = prompt('Edit notes / progress (you can add chapters as JSON array in console later)', entry.notes||'')
if(notes!==null) setData(d=> ({ subjects: d.subjects.map(s=> s.id===subj.id? {...s, entries: s.entries.map(en=> en.id===entry.id? {...en, notes, updated:Date.now()} : en) } : s) })) }
return (
<div className="container">
<div className="flex items-center justify-between mb-4">
<div>
<h2 className="text-2xl font-semibold">{subj.title}</h2>
<div className="text-slate-400">{subj.desc}</div>
</div>
<div className="flex gap-2">
<button className="btn" onClick={onBack}>Back</button>
<button className="btn primary" onClick={addEntry}>Add Entry</button>
</div>
</div>
<EntryList entries={subj.entries||[]} onEdit={editEntry} onDelete={deleteEntry} onOpen={openEntry} />
</div>
)
}
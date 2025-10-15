import React from 'react'


export default function SubjectCard({subject, onOpen, onEdit}){
const doneCount = (subject.entries||[]).filter(e=>e.doneDate).length
const total = (subject.entries||[]).length
const pct = total===0?0: Math.round(doneCount/total*100)
return (
<div className="card mb-3 cursor-pointer" onClick={onOpen}>
<div className="flex justify-between items-start">
<div>
<h3 className="text-lg font-semibold">{subject.title}</h3>
<p className="text-sm text-slate-400">{subject.desc}</p>
<div className="mt-2 flex flex-wrap gap-2">
{(subject.tags||[]).slice(0,4).map(t=> (
<span key={t} className="text-xs px-2 py-1 bg-slate-700 rounded">{t}</span>
))}
</div>
</div>
<div className="text-right">
<div className="text-sm text-slate-400">{doneCount}/{total} complete</div>
<div className="text-2xl mt-2">{pct}%</div>
<button className="mt-3 px-3 py-1 bg-indigo-600 rounded text-sm" onClick={(e)=>{ e.stopPropagation(); onEdit() }}>Edit</button>
</div>
</div>
</div>
)
}
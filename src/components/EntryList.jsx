import React from 'react'


export default function EntryList({entries, onEdit, onDelete, onOpen}){
return (
<div className="space-y-3">
{entries.map(e=> (
<div key={e.id} className="card flex justify-between items-start">
<div>
<div className="font-semibold">{e.title}</div>
<div className="text-sm text-slate-400">{e.type} • {e.source}</div>
<div className="text-sm text-slate-500 mt-2">{e.notes?.slice(0,120)}</div>
</div>
<div className="flex flex-col items-end gap-2">
<div className="text-sm text-slate-400">{e.startDate||'–'}</div>
<div className="text-sm">{e.doneDate? <span className="text-green-400">Done</span> : <span className="text-yellow-400">Open</span>}</div>
<div className="flex gap-2 mt-2">
<button className="px-2 py-1 bg-slate-700 rounded" onClick={()=>onOpen(e)}>Open</button>
<button className="px-2 py-1 bg-amber-600 rounded" onClick={()=>onEdit(e)}>Edit</button>
<button className="px-2 py-1 bg-red-600 rounded" onClick={()=>onDelete(e)}>Delete</button>
</div>
</div>
</div>
))}
</div>
)
}
const KEY_PREFIX = 'studytracker_v2_user_'


export function storageKeyFor(uid){ return KEY_PREFIX + uid }


export function loadUserData(uid){
try{
const raw = localStorage.getItem(storageKeyFor(uid))
if(!raw) return { subjects: [] }
return JSON.parse(raw)
}catch(e){ return { subjects: [] } }
}


export function saveUserData(uid, data){
localStorage.setItem(storageKeyFor(uid), JSON.stringify(data))
}


export function exportUserData(uid){
const data = loadUserData(uid)
return JSON.stringify(data, null, 2)
}


export function importUserData(uid, raw){
try{ const obj = JSON.parse(raw); saveUserData(uid, obj); return true }catch(e){ return false }
}
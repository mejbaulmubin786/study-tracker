import React, { useState } from 'react'
import { auth, googleProvider } from '../firebase'
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth'


export default function Login({ onLogin }) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    async function handleEmailLogin(e) {
        e.preventDefault(); setLoading(true)
        try { const res = await signInWithEmailAndPassword(auth, email, password); onLogin(res.user); } catch (err) { alert(err.message) } finally { setLoading(false) }
    }
    async function handleGoogle() { setLoading(true); try { const res = await signInWithPopup(auth, googleProvider); onLogin(res.user); } catch (e) { alert(e.message) } finally { setLoading(false) } }
    return (
        <div className="container">
            <div className="max-w-md mx-auto">
                <div className="card">
                    <h2 className="text-2xl font-semibold">Sign in</h2>
                    <form className="mt-4" onSubmit={handleEmailLogin}>
                        <input className="input mb-2" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
                        <input className="input mb-2" placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
                        <div className="flex gap-2">
                            <button className="btn primary" type="submit" disabled={loading}>Sign in</button>
                            <button type="button" className="btn" onClick={handleGoogle}>Google</button>
                        </div>
                    </form>
                    <div className="text-sm text-slate-400 mt-3">Demo: you can create accounts in Firebase Auth for users.</div>
                </div>
            </div>
        </div>
    )
}
import React, { useState, type ChangeEvent, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { isAxiosError } from 'axios'
import api from '../service/api'

export default function Login() {
    const navigate = useNavigate()
    
    // Novo estado para controlar quem está logando
    const [tipoUsuario, setTipoUsuario] = useState<'paciente' | 'medico'>('paciente')
    
    const [credenciais, setCredenciais] = useState({
        email: "",
        senha: ""
    })
    
    const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle')
    const [errorMessage, setErrorMessage] = useState('')

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        setCredenciais({
            ...credenciais,
            [e.target.name]: e.target.value
        })
    }

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('loading')
    setErrorMessage('')
    
    try {
        const rota = tipoUsuario === 'paciente' ? '/login/paciente' : '/login/medico'
        const response = await api.post(rota, credenciais)
        alert(response.data.mensagem)
        navigate("/dashboard") 
        
    } catch (error: unknown) {
        setStatus('error')
        
        if (isAxiosError(error) && error.response?.data) {
            const msgDaApi = error.response.data.mensagem
            
            if (msgDaApi) {
                setErrorMessage(msgDaApi)
            } else {
                setErrorMessage("Email ou senha incorretos. Tente novamente.")
            }
        } else {
            setErrorMessage("Erro de conexão com o servidor.")
        }
        console.error("Erro no login:", error)
    }
}

    const temaPrincipal = tipoUsuario === 'paciente' 
        ? 'bg-sky-500 hover:bg-sky-400 shadow-[0_40px_120px_-40px_rgba(59,130,246,0.6)]' 
        : 'bg-emerald-500 hover:bg-emerald-400 shadow-[0_40px_120px_-40px_rgba(56,189,248,0.6)]'
        
    const focoInput = tipoUsuario === 'paciente' 
        ? 'focus:border-sky-400 focus:ring-sky-400/20' 
        : 'focus:border-emerald-400 focus:ring-emerald-400/20'

    return (
        <main className="flex min-h-[calc(100vh-72px)] items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 px-6 py-12 text-white">
            <div className={`w-full max-w-md rounded-[32px] border border-white/10 bg-slate-950/80 p-8 transition-shadow duration-500 backdrop-blur-xl sm:p-12 ${tipoUsuario === 'paciente' ? 'shadow-[0_40px_120px_-40px_rgba(59,130,246,0.5)]' : 'shadow-[0_40px_120px_-40px_rgba(16,185,129,0.5)]'}`}>
                <div className="mb-8 flex flex-col gap-4 text-center">
                    <h1 className="text-3xl font-black tracking-tight text-white">
                        Acesse sua conta
                    </h1>
                    <p className="text-sm text-slate-400">
                        Selecione seu perfil e insira suas credenciais.
                    </p>
                </div>

                {/* SELETOR DE TIPO DE USUÁRIO */}
                <div className="mb-8 flex rounded-full border border-white/5 bg-slate-900/50 p-1">
                    <button
                        type="button"
                        onClick={() => setTipoUsuario('paciente')}
                        className={`flex-1 rounded-full py-2.5 text-sm font-semibold transition-all ${
                            tipoUsuario === 'paciente' 
                            ? 'bg-sky-500 text-slate-950 shadow-md' 
                            : 'text-slate-400 hover:text-white'
                        }`}
                    >
                        Sou Paciente
                    </button>
                    <button
                        type="button"
                        onClick={() => setTipoUsuario('medico')}
                        className={`flex-1 rounded-full py-2.5 text-sm font-semibold transition-all ${
                            tipoUsuario === 'medico' 
                            ? 'bg-emerald-500 text-slate-950 shadow-md' 
                            : 'text-slate-400 hover:text-white'
                        }`}
                    >
                        Sou Médico
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="grid gap-6">
                    <label className="space-y-2">
                        <span className="font-semibold text-slate-200">Email</span>
                        <input
                            name="email"
                            type="email"
                            value={credenciais.email}
                            onChange={handleChange}
                            required
                            className={`w-full rounded-3xl border border-white/10 bg-slate-900/90 px-4 py-3 text-slate-100 outline-none transition focus:ring-2 ${focoInput}`}
                            placeholder="seu@email.com"
                        />
                    </label>

                    <label className="space-y-2">
                        <span className="font-semibold text-slate-200">Senha</span>
                        <input
                            name="senha"
                            type="password"
                            value={credenciais.senha}
                            onChange={handleChange}
                            required
                            className={`w-full rounded-3xl border border-white/10 bg-slate-900/90 px-4 py-3 text-slate-100 outline-none transition focus:ring-2 ${focoInput}`}
                            placeholder="••••••••"
                        />
                    </label>

                    {status === 'error' && (
                        <p className="text-center text-sm font-semibold text-rose-400">
                            {errorMessage}
                        </p>
                    )}

                    <button
                        type="submit"
                        disabled={status === 'loading'}
                        className={`mt-2 w-full rounded-full px-8 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-slate-950 transition disabled:cursor-not-allowed disabled:opacity-70 ${temaPrincipal}`}
                    >
                        {status === 'loading' ? 'Entrando...' : 'Entrar'}
                    </button>
                </form>

                <div className="mt-8 text-center text-sm text-slate-400">
                    Ainda não tem conta?{' '}
                    <button 
                        onClick={() => navigate("/")} 
                        className={`font-semibold transition ${tipoUsuario === 'paciente' ? 'text-sky-400 hover:text-sky-300' : 'text-emerald-400 hover:text-emerald-300'}`}
                    >
                        Voltar ao início
                    </button>
                </div>
            </div>
        </main>
    )
}
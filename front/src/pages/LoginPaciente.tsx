import React, { useState } from 'react'
import api from '../service/api'

const LoginPaciente: React.FC = () => {
  const [emailOrCpf, setEmailOrCpf] = useState('')
  const [senha, setSenha] = useState('')

  async function handleSubmit(e: any){
    e.preventDefault()
    try{
        const resposta = await api.post("/paciente/login", { emailOrCpf, senha })
        if(resposta.data.error){
            alert(resposta.data.error)
        } else {
            alert(resposta.data.mensagem)
        }
    }
    catch(error: any){
        if(error.response){
            alert(error.response.data.error || "Erro no login")
        } else {
            alert("Erro inesperado ao tentar realizar login")
        }
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-800 text-white px-6 py-12 sm:px-12 flex items-center justify-center">
      <div className="w-full max-w-md">
        <div className="rounded-[32px] border border-white/10 bg-slate-950/80 p-8 shadow-[0_35px_120px_-40px_rgba(59,130,246,0.75)] backdrop-blur-md">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-black tracking-tight text-white mb-2">Login do Paciente</h2>
            <p className="text-slate-400">Entre com seu email ou CPF e senha</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="emailOrCpf" className="block text-sm font-semibold uppercase tracking-[0.2em] text-sky-300 mb-2">
                Email ou CPF
              </label>
              <input
                type="text"
                id="emailOrCpf"
                value={emailOrCpf}
                onChange={(e) => setEmailOrCpf(e.target.value)}
                required
                className="w-full rounded-xl bg-slate-900/80 border border-white/10 px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition"
                placeholder="Digite seu email ou CPF"
              />
            </div>
            <div>
              <label htmlFor="senha" className="block text-sm font-semibold uppercase tracking-[0.2em] text-sky-300 mb-2">
                Senha
              </label>
              <input
                type="password"
                id="senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                required
                className="w-full rounded-xl bg-slate-900/80 border border-white/10 px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition"
                placeholder="Digite sua senha"
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-full bg-sky-500 px-6 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-slate-950 transition hover:bg-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 focus:ring-offset-slate-950"
            >
              Entrar
            </button>
          </form>
        </div>
      </div>
    </main>
  )
}

export default LoginPaciente
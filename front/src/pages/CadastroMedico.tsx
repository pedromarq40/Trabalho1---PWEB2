import { useState, type ChangeEvent, type FormEvent } from 'react'
import { isAxiosError } from 'axios'
import api from '../service/api'

interface CadastroMedico {
    nome: string;
    cpf: string;
    email: string;
    telefone: string;
    especializacao: string;
    dataDeNascimento: string;
    senha: string;
}

export default function CadastroMedico() {
    const [dadosMedico, setDadosMedico] = useState<CadastroMedico>({
        nome: "", cpf: "", email: "", telefone: "", especializacao: "", 
        dataDeNascimento: "", senha: ""
    })
    const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
    const [errorMessage, setErrorMessage] = useState('')

    function validarDadosMedico() {
        const objFormatado: Record<string, any> = {};
        
        for (const key of Object.keys(dadosMedico)) {
            const valor = dadosMedico[key as keyof CadastroMedico];
            
            if (typeof valor === 'string' && valor.trim() !== "") {
                if (key === 'dataDeNascimento') {
                    if (valor.includes('T')) {
                        objFormatado[key] = valor;
                    } else {
                        objFormatado[key] = `${valor}T00:00:00.000Z`;
                    }
                } else {
                    objFormatado[key] = valor;
                }
            }
        }
        
        return objFormatado;
    }

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        setDadosMedico({
            ...dadosMedico,
            [e.target.name]: e.target.value
        })
    }

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setStatus('idle')
        
        try {
            const dadosValidados = validarDadosMedico()
            
            const response = await api.post("/medico/", dadosValidados)
            
            setStatus('success')
            console.log(response.data.mensagem)
            
            setDadosMedico({
                nome: "", cpf: "", email: "", telefone: "", especializacao: "", 
                dataDeNascimento: "", senha: ""
            })
            
            setTimeout(() => alert(response.data.mensagem), 100);
            
        }
        catch (error: unknown) {
            setStatus('error')
            
            if (isAxiosError(error) && error.response?.data?.error) {
                const msg = error.response.data.error;
                setErrorMessage(msg)
                console.error("Erro da API:", msg)
            } else {
                setErrorMessage("Erro inesperado ao tentar cadastrar o médico.")
                console.error("Erro no catch:", error) 
            }
        }
    }

    return (
        <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 px-6 py-12 text-white sm:px-12">
            <div className="mx-auto max-w-5xl rounded-[32px] border border-white/10 bg-slate-950/80 p-8 shadow-[0_40px_120px_-40px_rgba(56,189,248,0.75)] backdrop-blur-xl sm:p-12">
                <div className="mb-10 flex flex-col gap-4 text-center">
                    <span className="mx-auto inline-flex rounded-full bg-emerald-500/15 px-4 py-2 text-sm font-semibold uppercase tracking-[0.3em] text-emerald-300">
                        Cadastro de Médico
                    </span>
                    <h1 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
                        Junte-se ao nosso corpo clínico
                    </h1>
                    <p className="mx-auto max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
                        Preencha suas informações profissionais e pessoais para criar seu acesso seguro ao sistema.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="grid gap-6">
                    <div className="grid gap-6 sm:grid-cols-2">
                        <label className="space-y-2">
                            <span className="font-semibold text-slate-200">Nome completo</span>
                            <input
                                name="nome"
                                value={dadosMedico.nome}
                                onChange={handleChange}
                                required
                                className="w-full rounded-3xl border border-white/10 bg-slate-900/90 px-4 py-3 text-slate-100 outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20"
                                placeholder="Ex: Dr. Carlos Silva"
                            />
                        </label>

                        <label className="space-y-2">
                            <span className="font-semibold text-slate-200">CPF</span>
                            <input
                                name="cpf"
                                value={dadosMedico.cpf}
                                onChange={handleChange}
                                required
                                className="w-full rounded-3xl border border-white/10 bg-slate-900/90 px-4 py-3 text-slate-100 outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20"
                                placeholder="000.000.000-00"
                            />
                        </label>
                    </div>

                    <div className="grid gap-6 sm:grid-cols-2">
                        <label className="space-y-2">
                            <span className="font-semibold text-slate-200">Email</span>
                            <input
                                name="email"
                                type="email"
                                value={dadosMedico.email}
                                onChange={handleChange}
                                required
                                className="w-full rounded-3xl border border-white/10 bg-slate-900/90 px-4 py-3 text-slate-100 outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20"
                                placeholder="carlos@email.com"
                            />
                        </label>

                        <label className="space-y-2">
                            <span className="font-semibold text-slate-200">Telefone</span>
                            <input
                                name="telefone"
                                type="tel"
                                value={dadosMedico.telefone}
                                onChange={handleChange}
                                required
                                className="w-full rounded-3xl border border-white/10 bg-slate-900/90 px-4 py-3 text-slate-100 outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20"
                                placeholder="(00) 90000-0000"
                            />
                        </label>
                    </div>

                    <div className="grid gap-6 sm:grid-cols-2">
                        <label className="space-y-2">
                            <span className="font-semibold text-slate-200">Especialização</span>
                            <input
                                name="especializacao"
                                type="text"
                                value={dadosMedico.especializacao}
                                onChange={handleChange}
                                required
                                className="w-full rounded-3xl border border-white/10 bg-slate-900/90 px-4 py-3 text-slate-100 outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20"
                                placeholder="Ex: Cardiologia"
                            />
                        </label>

                        <label className="space-y-2">
                            <span className="font-semibold text-slate-200">Data de nascimento</span>
                            <input
                                name="dataDeNascimento"
                                type="date"
                                value={dadosMedico.dataDeNascimento}
                                onChange={handleChange}
                                required
                                className="w-full rounded-3xl border border-white/10 bg-slate-900/90 px-4 py-3 text-slate-100 outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20"
                            />
                        </label>
                    </div>

                    <label className="space-y-2">
                        <span className="font-semibold text-slate-200">Senha</span>
                        <input
                            name="senha"
                            type="password"
                            value={dadosMedico.senha}
                            onChange={handleChange}
                            required
                            className="w-full rounded-3xl border border-white/10 bg-slate-900/90 px-4 py-3 text-slate-100 outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20"
                            placeholder="Crie uma senha segura"
                        />
                    </label>

                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mt-4">
                        <div>
                            {status === 'success' && (
                                <p className="text-sm font-semibold text-emerald-400">Médico cadastrado com sucesso!</p>
                            )}
                            {status === 'error' && (
                                <p className="text-sm font-semibold text-rose-400">{errorMessage}</p>
                            )}
                        </div>
                        <button
                            type="submit"
                            className="inline-flex items-center justify-center rounded-full bg-emerald-500 px-8 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-slate-950 transition hover:bg-emerald-400"
                        >
                            Criar Conta
                        </button>
                    </div>
                </form>
            </div>
        </main>
    )
}
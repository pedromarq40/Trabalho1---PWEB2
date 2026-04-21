import { useState, type ChangeEvent, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom';
import { isAxiosError } from 'axios'
import api from '../service/api'

interface CadastroPaciente {
    nome: string;
    cpf: string;
    email: string;
    telefone: string;
    altura: number | string;
    peso: number | string;
    dataDeNascimento: string;
    senha: string;
}

export default function CadastroPaciente() {
    const navigate = useNavigate()
    const [dadosPaciente, setDadosPaciente] = useState<CadastroPaciente>({
        nome: "", cpf: "", email: "", telefone: "", altura: "", peso: "",
        dataDeNascimento: "", senha: ""
    })
    const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
    const [errorMessage, setErrorMessage] = useState('')

    function validarDadosPaciente() {
        const objFormatado: Record<string, any> = {};
        
        for (const key of Object.keys(dadosPaciente)) {
            const valor = dadosPaciente[key as keyof CadastroPaciente];
            
            if (typeof valor === 'string' && valor.trim() !== "" && valor !== "") {
                if (key === 'altura' || key === 'peso') {
                    objFormatado[key] = Number(valor)
                } else if (key === 'dataDeNascimento') {
                    if (valor.includes('T')) {
                        objFormatado[key] = valor;
                    } else {
                        objFormatado[key] = `${valor}T00:00:00.000Z`;
                    }
                } else {
                    objFormatado[key] = valor
                }
            } else if (typeof valor === 'number') {
                objFormatado[key] = valor;
            }
        }
        
        return objFormatado;
    }

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        setDadosPaciente({
            ...dadosPaciente,
            [e.target.name]: e.target.value
        })
    }

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setStatus('idle')
        
        try {
            const dadosPacienteValidados = validarDadosPaciente()
            const response = await api.post("/paciente/", dadosPacienteValidados)
            setStatus('success')
            console.log(response.data.mensagem)
            alert(response.data.mensagem)
        }
        catch (error: unknown) {
            setStatus('error')
    
            if (isAxiosError(error) && error.response?.data?.error) {
                const msg = error.response.data.error;
                setErrorMessage(msg)
                console.error("Erro da API:", msg)
            } else {
                setErrorMessage("Erro inesperado ao tentar cadastrar.")
                console.error("Erro no catch:", error) 
            }
        }
    }

    return (
        <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 px-6 py-12 text-white sm:px-12">
            <div className="mx-auto max-w-5xl rounded-[32px] border border-white/10 bg-slate-950/80 p-8 shadow-[0_40px_120px_-40px_rgba(56,189,248,0.75)] backdrop-blur-xl sm:p-12">
                <div className="mb-10 flex flex-col gap-4 text-center">
                    <span className="mx-auto inline-flex rounded-full bg-sky-500/15 px-4 py-2 text-sm font-semibold uppercase tracking-[0.3em] text-sky-300">
                        Cadastro de Paciente
                    </span>
                    <h1 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
                        Crie sua conta de paciente com segurança e rapidez
                    </h1>
                    <p className="mx-auto max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
                        Preencha os dados essenciais e informe apenas o que for necessário. Campos opcionais ficam liberados para você completar depois.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="grid gap-6">
                    <div className="grid gap-6 sm:grid-cols-2">
                        <label className="space-y-2">
                            <span className="font-semibold text-slate-200">Nome completo</span>
                            <input
                                name="nome"
                                value={dadosPaciente.nome}
                                onChange={handleChange}
                                required
                                className="w-full rounded-3xl border border-white/10 bg-slate-900/90 px-4 py-3 text-slate-100 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-400/20"
                                placeholder="Ex: Ana Silva"
                            />
                        </label>

                        <label className="space-y-2">
                            <span className="font-semibold text-slate-200">CPF</span>
                            <input
                                name="cpf"
                                value={dadosPaciente.cpf}
                                onChange={handleChange}
                                required
                                className="w-full rounded-3xl border border-white/10 bg-slate-900/90 px-4 py-3 text-slate-100 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-400/20"
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
                                value={dadosPaciente.email}
                                onChange={handleChange}
                                required
                                className="w-full rounded-3xl border border-white/10 bg-slate-900/90 px-4 py-3 text-slate-100 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-400/20"
                                placeholder="ana@email.com"
                            />
                        </label>

                        <label className="space-y-2">
                            <span className="font-semibold text-slate-200">Telefone (opcional)</span>
                            <input
                                name="telefone"
                                type="tel"
                                value={dadosPaciente.telefone}
                                onChange={handleChange}
                                className="w-full rounded-3xl border border-white/10 bg-slate-900/90 px-4 py-3 text-slate-100 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-400/20"
                                placeholder="(00) 90000-0000"
                            />
                        </label>
                    </div>

                    <div className="grid gap-6 sm:grid-cols-3">
                        <label className="space-y-2">
                            <span className="font-semibold text-slate-200">Altura (opcional)</span>
                            <input
                                name="altura"
                                type="number"
                                step="0.01"
                                value={dadosPaciente.altura}
                                onChange={handleChange}
                                className="w-full rounded-3xl border border-white/10 bg-slate-900/90 px-4 py-3 text-slate-100 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-400/20"
                                placeholder="1.75"
                            />
                        </label>

                        <label className="space-y-2">
                            <span className="font-semibold text-slate-200">Peso (opcional)</span>
                            <input  
                                name="peso"
                                type="number"
                                step="0.1"
                                value={dadosPaciente.peso}
                                onChange={handleChange}
                                className="w-full rounded-3xl border border-white/10 bg-slate-900/90 px-4 py-3 text-slate-100 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-400/20"
                                placeholder="68.2"
                            />
                        </label>

                        <label className="space-y-2">
                            <span className="font-semibold text-slate-200">Data de nascimento (opcional)</span>
                            <input
                                name="dataDeNascimento"
                                type="date"
                                value={dadosPaciente.dataDeNascimento}
                                onChange={handleChange}
                                className="w-full rounded-3xl border border-white/10 bg-slate-900/90 px-4 py-3 text-slate-100 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-400/20"
                            />
                        </label>
                    </div>

                    <label className="space-y-2">
                        <span className="font-semibold text-slate-200">Senha</span>
                        <input
                            name="senha"
                            type="password"
                            value={dadosPaciente.senha}
                            onChange={handleChange}
                            required
                            className="w-full rounded-3xl border border-white/10 bg-slate-900/90 px-4 py-3 text-slate-100 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-400/20"
                            placeholder="Crie uma senha segura"
                        />
                    </label>

                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            {status === 'success' && (
                                <p className="text-sm font-semibold text-emerald-300">Paciente cadastrado com sucesso!</p>
                            )}
                            {status === 'error' && (
                                <p className="text-sm font-semibold text-rose-300">{errorMessage}</p>
                            )}
                        </div>
                        <button
                            type="submit"
                            className="inline-flex items-center justify-center rounded-full bg-sky-500 px-6 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-slate-950 transition hover:bg-sky-400"
                        >
                            Criar Paciente
                        </button>
                    </div>
                </form>
            </div>
        </main>
    )
}
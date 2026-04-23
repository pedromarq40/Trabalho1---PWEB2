import { useEffect, useMemo, useState } from 'react'
import api from '../service/api'

interface Paciente {
    id: number
    nome: string
    cpf: string
    email: string
    telefone?: string
    altura?: number
    peso?: number
    dataDeNascimento?: string
}

interface Mensagem {
    id: number
    atendimentoId: number
    remetente: 'PACIENTE' | 'MEDICO'
    texto: string
    criadoEm: string
}

interface Atendimento {
    id: number
    medicoId: number
    pacienteId: number
    prescricao?: string
    descricao?: string
    status: 'PENDENTE' | 'ACEITO' | 'FINALIZADO'
    paciente: Paciente
}

export default function DashboardMedico() {
    const [atendimentos, setAtendimentos] = useState<Atendimento[]>([])
    const [mensagens, setMensagens] = useState<Mensagem[]>([])
    const [idAtendimentoSelecionado, setIdAtendimentoSelecionado] = useState<number | null>(null)
    const [textoChat, setTextoChat] = useState('')
    const [carregando, setCarregando] = useState(true)
    const [erro, setErro] = useState('')
    const [mensagemSucesso, setMensagemSucesso] = useState('')

    const medicoId = Number(localStorage.getItem('userId') ?? 0)

    useEffect(() => {
        async function buscarDados() {
            if (!medicoId) return
            try {
                setCarregando(true)
                const resposta = await api.get<Atendimento[]>(`/atendimento/medico/${medicoId}`)
                setAtendimentos(resposta.data)
                
                const primeiroAceito = resposta.data.find(a => a.status === 'ACEITO')
                if (primeiroAceito) setIdAtendimentoSelecionado(primeiroAceito.id)
            } catch (err) {
                setErro('Erro ao carregar atendimentos.')
            } finally {
                setCarregando(false)
            }
        }
        buscarDados()
    }, [medicoId])

    useEffect(() => {
        async function buscarMensagens() {
            if (!idAtendimentoSelecionado) return
            try {
                const resposta = await api.get<Mensagem[]>(`/mensagem/atendimento/${idAtendimentoSelecionado}`)
                setMensagens(resposta.data)
            } catch (err) {
                setErro('Erro ao carregar chat.')
            }
        }
        buscarMensagens()
    }, [idAtendimentoSelecionado])

    const pendentes = useMemo(() => atendimentos.filter(a => a.status === 'PENDENTE'), [atendimentos])
    const emCurso = useMemo(() => atendimentos.filter(a => a.status === 'ACEITO'), [atendimentos])
    const atendimentoSelecionado = atendimentos.find(a => a.id === idAtendimentoSelecionado)

    const calcularIMC = (peso?: number, altura?: number) => {
        if (!peso || !altura || altura === 0) return 'N/A'
        return (peso / (altura * altura)).toFixed(2)
    }

    async function atualizarStatus(id: number, status: 'ACEITO' | 'FINALIZADO') {
        try {
            await api.patch(`/atendimento/${id}`, { status })
            const resposta = await api.get<Atendimento[]>(`/atendimento/medico/${medicoId}`)
            setAtendimentos(resposta.data)
            setMensagemSucesso(`Atendimento ${status.toLowerCase()}!`)
        } catch (err) {
            setErro('Erro ao atualizar status.')
        }
    }

    async function handleEnviarMensagem() {
        if (!idAtendimentoSelecionado || !textoChat.trim()) return
        try {
            await api.post('/mensagem', {
                atendimentoId: idAtendimentoSelecionado,
                remetente: 'MEDICO',
                texto: textoChat.trim()
            })
            setTextoChat('')
            const resposta = await api.get<Mensagem[]>(`/mensagem/atendimento/${idAtendimentoSelecionado}`)
            setMensagens(resposta.data)
        } catch (err) {
            setErro('Erro ao enviar mensagem.')
        }
    }

    return (
        <main className="min-h-[calc(100vh-72px)] bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-white px-4 py-8">
            <div className="mx-auto max-w-[1400px] space-y-6">
                
                {/* ALERTAS */}
                {erro && <p className="bg-rose-500/20 border border-rose-500/50 p-4 rounded-2xl text-rose-200">{erro}</p>}
                {mensagemSucesso && <p className="bg-emerald-500/20 border border-emerald-500/50 p-4 rounded-2xl text-emerald-200">{mensagemSucesso}</p>}

                <div className="grid gap-6 lg:grid-cols-[350px_1fr_350px]">
                    
                    {/* COLUNA 1: SOLICITAÇÕES PENDENTES */}
                    <aside className="space-y-6">
                        <div className="rounded-[32px] border border-white/10 bg-slate-900/60 p-6 backdrop-blur-md">
                            <h2 className="text-xl font-bold mb-4 flex justify-between items-center">
                                Pendentes <span className="text-xs bg-emerald-500/20 text-emerald-400 px-2 py-1 rounded-full">{pendentes.length}</span>
                            </h2>
                            <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
                                {pendentes.map(item => (
                                    <div key={item.id} className="bg-slate-950/50 border border-white/5 p-4 rounded-2xl space-y-3">
                                        <p className="font-bold text-sky-400">{item.paciente.nome}</p>
                                        <p className="text-sm text-slate-400 line-clamp-2">{item.descricao}</p>
                                        <button 
                                            onClick={() => atualizarStatus(item.id, 'ACEITO')}
                                            className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition"
                                        >
                                            Aceitar
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </aside>

                    {/* COLUNA 2: DADOS DO PACIENTE E CHAT */}
                    <section className="space-y-6">
                        {atendimentoSelecionado ? (
                            <>
                                {/* PRONTUÁRIO DO PACIENTE */}
                                <div className="rounded-[32px] border border-emerald-500/30 bg-slate-900/80 p-8 shadow-2xl">
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                        <div className="col-span-2">
                                            <p className="text-[10px] uppercase tracking-[0.2em] text-emerald-400 font-bold">Paciente em atendimento</p>
                                            <h2 className="text-3xl font-black mt-1">{atendimentoSelecionado.paciente.nome}</h2>
                                            <p className="text-slate-400 text-sm mt-1">CPF: {atendimentoSelecionado.paciente.cpf}</p>
                                        </div>
                                        <div className="text-right col-span-2">
                                            <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-4 py-1 rounded-full text-xs font-bold">SESSÃO ATIVA</span>
                                        </div>
                                        
                                        <div className="bg-slate-950/50 p-4 rounded-2xl border border-white/5">
                                            <p className="text-[10px] text-slate-500 uppercase font-bold">Altura</p>
                                            <p className="text-xl font-bold text-sky-400">{atendimentoSelecionado.paciente.altura || '--'} m</p>
                                        </div>
                                        <div className="bg-slate-950/50 p-4 rounded-2xl border border-white/5">
                                            <p className="text-[10px] text-slate-500 uppercase font-bold">Peso</p>
                                            <p className="text-xl font-bold text-emerald-400">{atendimentoSelecionado.paciente.peso || '--'} kg</p>
                                        </div>
                                        <div className="bg-slate-950/50 p-4 rounded-2xl border border-emerald-500/20">
                                            <p className="text-[10px] text-slate-500 uppercase font-bold">IMC Corporal</p>
                                            <p className="text-xl font-bold">
                                                {calcularIMC(atendimentoSelecionado.paciente.peso, atendimentoSelecionado.paciente.altura)}
                                            </p>
                                        </div>
                                        <div className="bg-slate-950/50 p-4 rounded-2xl border border-white/5">
                                            <p className="text-[10px] text-slate-500 uppercase font-bold">Nascimento</p>
                                            <p className="text-sm font-bold mt-1">
                                                {atendimentoSelecionado.paciente.dataDeNascimento ? new Date(atendimentoSelecionado.paciente.dataDeNascimento).toLocaleDateString() : 'N/A'}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* CHAT */}
                                <div className="rounded-[32px] border border-white/10 bg-slate-900/40 p-6 flex flex-col h-[500px]">
                                    <div className="flex-1 overflow-y-auto space-y-4 pr-2">
                                        {mensagens.map(msg => (
                                            <div key={msg.id} className={`flex flex-col ${msg.remetente === 'MEDICO' ? 'items-end' : 'items-start'}`}>
                                                <div className={`max-w-[80%] p-4 rounded-2xl text-sm ${msg.remetente === 'MEDICO' ? 'bg-emerald-500 text-slate-950 rounded-tr-none' : 'bg-slate-800 text-white rounded-tl-none'}`}>
                                                    {msg.texto}
                                                </div>
                                                <span className="text-[10px] text-slate-500 mt-1">{new Date(msg.criadoEm).toLocaleTimeString()}</span>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="mt-4 flex gap-2">
                                        <input 
                                            value={textoChat} 
                                            onChange={e => setTextoChat(e.target.value)}
                                            placeholder="Digite uma mensagem ou orientação..."
                                            className="flex-1 bg-slate-950 border border-white/10 rounded-2xl px-4 py-3 outline-none focus:border-emerald-500 transition"
                                        />
                                        <button onClick={handleEnviarMensagem} className="bg-emerald-500 p-4 rounded-2xl text-slate-950 hover:bg-emerald-400 transition">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                                        </button>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div className="h-full flex items-center justify-center border-2 border-dashed border-white/5 rounded-[32px]">
                                <p className="text-slate-500">Selecione um atendimento para visualizar os dados e o chat.</p>
                            </div>
                        )}
                    </section>

                    {/* COLUNA 3: ATENDIMENTOS ATIVOS */}
                    <aside className="space-y-6">
                        <div className="rounded-[32px] border border-white/10 bg-slate-900/60 p-6 backdrop-blur-md">
                            <h2 className="text-xl font-bold mb-4">Em Curso</h2>
                            <div className="space-y-3">
                                {emCurso.map(item => (
                                    <button
                                        key={item.id}
                                        onClick={() => setIdAtendimentoSelecionado(item.id)}
                                        className={`w-full p-4 rounded-2xl text-left border transition ${item.id === idAtendimentoSelecionado ? 'bg-emerald-500/10 border-emerald-500' : 'bg-slate-950/30 border-white/5 hover:border-white/20'}`}
                                    >
                                        <p className="font-bold text-sm">{item.paciente.nome}</p>
                                        <p className="text-[10px] text-slate-500 mt-1 uppercase tracking-widest">ID #{item.id}</p>
                                        <button 
                                            onClick={(e) => { 
                                                e.stopPropagation()
                                                atualizarStatus(item.id, 'FINALIZADO')
                                                setIdAtendimentoSelecionado(null)
                                            }}
                                            className="mt-3 text-[10px] font-bold text-rose-400 hover:text-rose-300 uppercase"
                                        >
                                            Finalizar Atendimento
                                        </button>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </main>
    )
}
import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../service/api'

interface Medico {
    id: number
    nome: string
    email: string
    telefone: string
    especializacao: string
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
    medico: Medico
}

export default function DashboardPaciente() {
    const navigate = useNavigate()
    const [medicos, setMedicos] = useState<Medico[]>([])
    const [atendimentos, setAtendimentos] = useState<Atendimento[]>([])
    const [messages, setMessages] = useState<Mensagem[]>([])
    const [selectedAtendimentoId, setSelectedAtendimentoId] = useState<number | null>(null)
    const [searchTerm, setSearchTerm] = useState('')
    const [chatText, setChatText] = useState('')
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [message, setMessage] = useState('')

    const pacienteId = Number(localStorage.getItem('userId') ?? 0)

    useEffect(() => {
        async function fetchData() {
            if (!pacienteId) return

            try {
                setLoading(true)
                const [medicosResponse, atendimentosResponse] = await Promise.all([
                    api.get<Medico[]>('/medico'),
                    api.get<Atendimento[]>(`/atendimento/paciente/${pacienteId}`)
                ])

                setMedicos(medicosResponse.data)
                setAtendimentos(atendimentosResponse.data)
                setError('')
                const primeiroAtendimentoAceito = atendimentosResponse.data.find((item) => item.status === 'ACEITO')
                setSelectedAtendimentoId(primeiroAtendimentoAceito ? primeiroAtendimentoAceito.id : null)
            } catch (err) {
                console.error(err)
                setError('Não foi possível carregar os dados. Tente novamente mais tarde.')
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [pacienteId])

    useEffect(() => {
        async function fetchMessages() {
            if (!selectedAtendimentoId) return
            try {
                const response = await api.get<Mensagem[]>(`/mensagem/atendimento/${selectedAtendimentoId}`)
                setMessages(response.data)
            } catch (err) {
                console.error(err)
                setError('Não foi possível carregar as mensagens.')
            }
        }

        fetchMessages()
    }, [selectedAtendimentoId])

    const medicosFiltrados = useMemo(() => {
        const termo = searchTerm.toLowerCase().trim()
        if (!termo) return medicos

        return medicos.filter((medico) =>
            medico.nome.toLowerCase().includes(termo) ||
            medico.especializacao.toLowerCase().includes(termo) ||
            medico.email.toLowerCase().includes(termo)
        )
    }, [medicos, searchTerm])

    const solicitacoesPendentes = atendimentos.filter((item) => item.status === 'PENDENTE')
    const atendimentosEmCurso = atendimentos.filter((item) => item.status === 'ACEITO')
    const selectedAtendimento = atendimentos.find((item) => item.id === selectedAtendimentoId)

    async function refreshAtendimentos() {
        if (!pacienteId) return
        const response = await api.get<Atendimento[]>(`/atendimento/paciente/${pacienteId}`)
        setAtendimentos(response.data)
    }

    async function handleSolicitarAtendimento(medicoId: number) {
        const descricao = window.prompt('Descreva o motivo da solicitação de atendimento:')
        if (!descricao?.trim()) return

        try {
            setLoading(true)
            await api.post('/atendimento', {
                pacienteId,
                medicoId,
                descricao,
                prescricao: ''
            })
            setMessage('Solicitação enviada com sucesso.')
            await refreshAtendimentos()
            setError('')
        } catch (err) {
            console.error(err)
            setError('Não foi possível enviar a solicitação. Tente novamente.')
        } finally {
            setLoading(false)
        }
    }

    async function handleSendMessage() {
        if (!selectedAtendimentoId || !chatText.trim()) return
        try {
            await api.post('/mensagem', {
                atendimentoId: selectedAtendimentoId,
                remetente: 'PACIENTE',
                texto: chatText.trim()
            })
            setChatText('')
            const response = await api.get<Mensagem[]>(`/mensagem/atendimento/${selectedAtendimentoId}`)
            setMessages(response.data)
        } catch (err) {
            console.error(err)
            setError('Não foi possível enviar a mensagem.')
        }
    }

    return (
        <main className="min-h-[calc(100vh-72px)] bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-white px-6 py-12">
            <div className="mx-auto max-w-6xl space-y-8 rounded-[32px] border border-white/10 bg-slate-950/85 p-8 shadow-[0_35px_120px_-40px_rgba(59,130,246,0.75)] backdrop-blur-md sm:p-12">
                <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-300">Área do Paciente</p>
                        <h1 className="mt-4 text-4xl font-black tracking-tight text-white sm:text-5xl">Buscar médico e conversar sobre atendimento</h1>
                    </div>
                    <button
                        onClick={() => navigate('/')}
                        className="w-full rounded-full bg-sky-500 px-6 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-slate-950 transition hover:bg-sky-400 sm:w-auto"
                    >
                        Voltar ao início
                    </button>
                </header>

                {error && <p className="rounded-3xl border border-rose-500/20 bg-rose-500/10 p-4 text-sm text-rose-200">{error}</p>}
                {message && <p className="rounded-3xl border border-emerald-500/20 bg-emerald-500/10 p-4 text-sm text-emerald-200">{message}</p>}

                <div className="grid gap-8 lg:grid-cols-[1.4fr_0.75fr]">
                    <section className="space-y-6">
                        <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-6 shadow-lg shadow-slate-950/20">
                            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                                <div>
                                    <h2 className="text-xl font-semibold text-white">Buscar médicos</h2>
                                    <p className="mt-2 text-sm leading-6 text-slate-400">
                                        Procure por especialidade, nome ou email e solicite atendimento ao médico desejado.
                                    </p>
                                </div>
                                <span className="inline-flex rounded-full bg-sky-500/10 px-4 py-2 text-sm font-semibold uppercase tracking-[0.18em] text-sky-300">
                                    {medicosFiltrados.length} médicos
                                </span>
                            </div>

                            <div className="mt-6">
                                <input
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    placeholder="Buscar por nome, especialidade ou email"
                                    className="w-full rounded-3xl border border-white/10 bg-slate-950/90 px-4 py-3 text-slate-100 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-400/20"
                                />
                            </div>

                            <div className="mt-6 space-y-4">
                                {loading && <p className="text-sm text-slate-300">Carregando médicos...</p>}
                                {!loading && medicosFiltrados.length === 0 && <p className="text-sm text-slate-300">Nenhum médico encontrado.</p>}
                                {medicosFiltrados.map((medico) => (
                                    <article key={medico.id} className="rounded-3xl border border-white/10 bg-slate-950/80 p-5 transition hover:border-sky-400/40 hover:bg-slate-900">
                                        <div className="flex items-center justify-between gap-4">
                                            <div>
                                                <h3 className="text-lg font-semibold text-white">{medico.nome}</h3>
                                                <p className="text-sm text-slate-400">{medico.especializacao}</p>
                                            </div>
                                            <button
                                                onClick={() => handleSolicitarAtendimento(medico.id)}
                                                className="rounded-full bg-emerald-500 px-4 py-2 text-sm font-semibold uppercase tracking-[0.12em] text-slate-950 transition hover:bg-emerald-400"
                                            >
                                                Solicitar
                                            </button>
                                        </div>
                                        <div className="mt-4 grid gap-2 text-sm text-slate-400 sm:grid-cols-2">
                                            <p><span className="font-semibold text-slate-200">Email:</span> {medico.email}</p>
                                            <p><span className="font-semibold text-slate-200">Telefone:</span> {medico.telefone}</p>
                                        </div>
                                    </article>
                                ))}
                            </div>
                        </div>

                        <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-6 shadow-lg shadow-slate-950/20">
                            <h2 className="text-xl font-semibold text-white">Chat do atendimento</h2>
                            <p className="mt-2 text-sm leading-6 text-slate-400">Converse com o médico responsável pelo atendimento aceito.</p>

                            {!selectedAtendimento && (
                                <p className="mt-4 text-sm text-slate-300">Selecione um atendimento aceito para abrir o chat.</p>
                            )}

                            {selectedAtendimento && (
                                <div className="mt-6 flex h-[450px] flex-col gap-4">
                                    <div className="flex-1 overflow-y-auto rounded-3xl border border-white/10 bg-slate-950/90 p-4">
                                        {messages.length === 0 && <p className="text-sm text-slate-300">Nenhuma mensagem ainda. Envie a primeira mensagem.</p>}
                                        {messages.map((msg) => (
                                            <div key={msg.id} className={`mt-4 rounded-3xl p-4 ${msg.remetente === 'PACIENTE' ? 'bg-sky-500/10 text-sky-100 self-end' : 'bg-slate-800/80 text-slate-100 self-start'}`}>
                                                <p className="text-xs uppercase tracking-[0.18em] text-slate-400">{msg.remetente === 'PACIENTE' ? 'Você' : selectedAtendimento.medico.nome}</p>
                                                <p className="mt-2 text-sm leading-6">{msg.texto}</p>
                                                <p className="mt-2 text-xs text-slate-500">{new Date(msg.criadoEm).toLocaleString()}</p>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="flex flex-col gap-3">
                                        <textarea
                                            value={chatText}
                                            onChange={(e) => setChatText(e.target.value)}
                                            rows={3}
                                            placeholder="Escreva sua mensagem..."
                                            className="w-full resize-none rounded-3xl border border-white/10 bg-slate-950/90 px-4 py-3 text-slate-100 outline-none transition focus:border-sky-400 focus:ring-2 focus:ring-sky-400/20"
                                        />
                                        <button
                                            onClick={handleSendMessage}
                                            className="w-full rounded-full bg-sky-500 px-6 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-slate-950 transition hover:bg-sky-400"
                                        >
                                            Enviar mensagem
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </section>

                    <aside className="space-y-6">
                        <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-6 shadow-lg shadow-slate-950/20">
                            <div className="flex items-center justify-between gap-4">
                                <div>
                                    <h2 className="text-xl font-semibold text-white">Solicitações pendentes</h2>
                                    <p className="mt-2 text-sm leading-6 text-slate-400">Acompanhe as solicitações enviadas que ainda não foram aceitas.</p>
                                </div>
                                <span className="inline-flex rounded-full bg-sky-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-sky-300">
                                    {solicitacoesPendentes.length}
                                </span>
                            </div>

                            <div className="mt-6 space-y-4">
                                {loading && <p className="text-sm text-slate-300">Carregando solicitações...</p>}
                                {!loading && solicitacoesPendentes.length === 0 && <p className="text-sm text-slate-300">Nenhuma solicitação pendente.</p>}
                                {solicitacoesPendentes.map((item) => (
                                    <div key={item.id} className="rounded-3xl border border-white/10 bg-slate-950/80 p-5">
                                        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-sky-300">#{item.id} - {item.medico.nome}</p>
                                        <p className="mt-3 text-sm text-slate-300">Motivo: {item.descricao || 'Sem descrição'}</p>
                                        <p className="mt-2 text-sm text-slate-400">Status: {item.status}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-6 shadow-lg shadow-slate-950/20">
                            <div className="flex items-center justify-between gap-4">
                                <div>
                                    <h2 className="text-xl font-semibold text-white">Atendimentos em ocorrência</h2>
                                    <p className="mt-2 text-sm leading-6 text-slate-400">Exibe atendimentos aceitos e em andamento.</p>
                                </div>
                                <span className="inline-flex rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-300">
                                    {atendimentosEmCurso.length}
                                </span>
                            </div>

                            <div className="mt-6 space-y-4">
                                {!loading && atendimentosEmCurso.length === 0 && <p className="text-sm text-slate-300">Nenhum atendimento em curso.</p>}
                                {atendimentosEmCurso.map((item) => (
                                    <button
                                        key={item.id}
                                        type="button"
                                        onClick={() => setSelectedAtendimentoId(item.id)}
                                        className={`w-full rounded-3xl border p-5 text-left transition ${item.id === selectedAtendimentoId ? 'border-sky-500 bg-slate-900' : 'border-white/10 bg-slate-950/80 hover:border-sky-400/40'}`}
                                    >
                                        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-300">#{item.id} - {item.medico.nome}</p>
                                        <p className="mt-3 text-sm text-slate-300">Motivo: {item.descricao || 'Sem descrição'}</p>
                                        <p className="mt-2 text-sm text-slate-400">Status: {item.status}</p>
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

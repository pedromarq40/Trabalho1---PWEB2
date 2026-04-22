import { useEffect, useMemo, useState } from 'react'
import api from '../service/api'

interface Paciente {
    id: number
    nome: string
    email: string
    telefone?: string
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
                setErro('')
                
                const primeiroAtendimentoAceito = resposta.data.find((item) => item.status === 'ACEITO')
                setIdAtendimentoSelecionado(primeiroAtendimentoAceito ? primeiroAtendimentoAceito.id : null)
            } catch (err) {
                console.error(err)
                setErro('Não foi possível carregar os atendimentos. Tente novamente.')
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
                console.error(err)
                setErro('Não foi possível carregar as mensagens.')
            }
        }

        buscarMensagens()
    }, [idAtendimentoSelecionado])

    const pendentes = useMemo(() => atendimentos.filter((item) => item.status === 'PENDENTE'), [atendimentos])
    const emCurso = useMemo(() => atendimentos.filter((item) => item.status === 'ACEITO'), [atendimentos])
    const atendimentoSelecionado = atendimentos.find((item) => item.id === idAtendimentoSelecionado)

    async function atualizarListaAtendimentos() {
        if (!medicoId) return
        const resposta = await api.get<Atendimento[]>(`/atendimento/medico/${medicoId}`)
        setAtendimentos(resposta.data)
    }

    async function atualizarStatusAtendimento(id: number, status: 'ACEITO' | 'FINALIZADO') {
        try {
            setCarregando(true)
            await api.patch(`/atendimento/${id}`, { status })
            await atualizarListaAtendimentos()
            setMensagemSucesso(status === 'ACEITO' ? 'Atendimento aceito com sucesso.' : 'Atendimento finalizado com sucesso.')
            setErro('')
        } catch (err) {
            console.error(err)
            setErro('Não foi possível atualizar o atendimento. Tente novamente.')
        } finally {
            setCarregando(false)
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
            console.error(err)
            setErro('Não foi possível enviar a mensagem.')
        }
    }

    return (
        <main className="min-h-[calc(100vh-72px)] bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-white px-6 py-12">
            <div className="mx-auto max-w-6xl space-y-8 rounded-[32px] border border-white/10 bg-slate-950/85 p-8 shadow-[0_35px_120px_-40px_rgba(16,185,129,0.75)] backdrop-blur-md sm:p-12">
                <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-300">Área do Médico</p>
                        <h1 className="mt-4 text-4xl font-black tracking-tight text-white sm:text-5xl">Solicitações de atendimento</h1>
                        <p className="mt-2 max-w-2xl text-base leading-7 text-slate-300">
                            Veja solicitações pendentes, aceite atendimentos e converse com o paciente.
                        </p>
                    </div>
                </header>

                {erro && <p className="rounded-3xl border border-rose-500/20 bg-rose-500/10 p-4 text-sm text-rose-200">{erro}</p>}
                {mensagemSucesso && <p className="rounded-3xl border border-emerald-500/20 bg-emerald-500/10 p-4 text-sm text-emerald-200">{mensagemSucesso}</p>}

                <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
                    <section className="space-y-6">
                        <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-6 shadow-lg shadow-slate-950/20">
                            <div className="flex items-center justify-between gap-4">
                                <div>
                                    <h2 className="text-xl font-semibold text-white">Solicitações pendentes</h2>
                                    <p className="mt-2 text-sm leading-6 text-slate-400">Aprove ou recuse para iniciar o atendimento.</p>
                                </div>
                                <span className="inline-flex rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-300">
                                    {pendentes.length}
                                </span>
                            </div>

                            <div className="mt-6 space-y-4">
                                {carregando && <p className="text-sm text-slate-300">Carregando solicitações...</p>}
                                {!carregando && pendentes.length === 0 && <p className="text-sm text-slate-300">Nenhuma solicitação pendente.</p>}
                                {pendentes.map((item) => (
                                    <div key={item.id} className="rounded-3xl border border-white/10 bg-slate-950/80 p-5">
                                        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-sky-300">#{item.id} - {item.paciente.nome}</p>
                                        <p className="mt-3 text-sm text-slate-300">Motivo: {item.descricao || 'Sem descrição'}</p>
                                        <p className="mt-2 text-sm text-slate-400">Email: {item.paciente.email}</p>
                                        <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                                            <button
                                                onClick={() => atualizarStatusAtendimento(item.id, 'ACEITO')}
                                                className="rounded-full bg-emerald-500 px-4 py-2 text-sm font-semibold uppercase tracking-[0.12em] text-slate-950 transition hover:bg-emerald-400"
                                            >
                                                Aceitar
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-6 shadow-lg shadow-slate-950/20">
                            <h2 className="text-xl font-semibold text-white">Chat do atendimento</h2>
                            <p className="mt-2 text-sm leading-6 text-slate-400">Converse virtualmente com o paciente sobre o atendimento.</p>

                            {!atendimentoSelecionado && (
                                <p className="mt-4 text-sm text-slate-300">Selecione um atendimento aceito para abrir o chat.</p>
                            )}

                            {atendimentoSelecionado && (
                                <div className="mt-6 flex h-[450px] flex-col gap-4">
                                    <div className="flex-1 overflow-y-auto rounded-3xl border border-white/10 bg-slate-950/90 p-4">
                                        {mensagens.length === 0 && <p className="text-sm text-slate-300">Nenhuma mensagem ainda. Envie a primeira mensagem.</p>}
                                        {mensagens.map((msg) => (
                                            <div key={msg.id} className={`mt-4 rounded-3xl p-4 ${msg.remetente === 'MEDICO' ? 'bg-emerald-500/10 text-emerald-100 self-end' : 'bg-slate-800/80 text-slate-100 self-start'}`}>
                                                <p className="text-xs uppercase tracking-[0.18em] text-slate-400">{msg.remetente === 'MEDICO' ? 'Você' : atendimentoSelecionado.paciente.nome}</p>
                                                <p className="mt-2 text-sm leading-6">{msg.texto}</p>
                                                <p className="mt-2 text-xs text-slate-500">{new Date(msg.criadoEm).toLocaleString()}</p>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="flex flex-col gap-3">
                                        <textarea
                                            value={textoChat}
                                            onChange={(e) => setTextoChat(e.target.value)}
                                            rows={3}
                                            placeholder="Escreva sua mensagem..."
                                            className="w-full resize-none rounded-3xl border border-white/10 bg-slate-950/90 px-4 py-3 text-slate-100 outline-none transition focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20"
                                        />
                                        <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
                                            <button
                                                onClick={handleEnviarMensagem}
                                                className="rounded-full bg-emerald-500 px-6 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-slate-950 transition hover:bg-emerald-400"
                                            >
                                                Enviar mensagem
                                            </button>
                                            {atendimentoSelecionado.status === 'ACEITO' && (
                                                <button
                                                    onClick={() => atualizarStatusAtendimento(atendimentoSelecionado.id, 'FINALIZADO')}
                                                    className="rounded-full bg-rose-500 px-6 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-slate-950 transition hover:bg-rose-400"
                                                >
                                                    Finalizar atendimento
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </section>

                    <aside className="space-y-6">
                        <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-6 shadow-lg shadow-slate-950/20">
                            <div className="flex items-center justify-between gap-4">
                                <div>
                                    <h2 className="text-xl font-semibold text-white">Atendimentos em curso</h2>
                                    <p className="mt-2 text-sm leading-6 text-slate-400">Veja os atendimentos aceitos que estão ativos.</p>
                                </div>
                                <span className="inline-flex rounded-full bg-sky-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-sky-300">
                                    {emCurso.length}
                                </span>
                            </div>

                            <div className="mt-6 space-y-4">
                                {!carregando && emCurso.length === 0 && <p className="text-sm text-slate-300">Nenhum atendimento em curso.</p>}
                                {emCurso.map((item) => (
                                    <div key={item.id} className={`rounded-3xl border p-5 transition ${item.id === idAtendimentoSelecionado ? 'border-emerald-500 bg-slate-900' : 'border-white/10 bg-slate-950/80 hover:border-emerald-400/40'}`}>
                                        <button
                                            type="button"
                                            onClick={() => setIdAtendimentoSelecionado(item.id)}
                                            className="w-full text-left"
                                        >
                                            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-300">#{item.id} - {item.paciente.nome}</p>
                                            <p className="mt-3 text-sm text-slate-300">Motivo: {item.descricao || 'Sem descrição'}</p>
                                            <p className="mt-2 text-sm text-slate-400">Email: {item.paciente.email}</p>
                                        </button>
                                        <button
                                            onClick={() => atualizarStatusAtendimento(item.id, 'FINALIZADO')}
                                            className="mt-4 inline-flex rounded-full bg-rose-500 px-4 py-2 text-sm font-semibold uppercase tracking-[0.12em] text-slate-950 transition hover:bg-rose-400"
                                        >
                                            Finalizar
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </main>
    )
}
import { useNavigate } from "react-router-dom"

export default function Home() {
    const navigate = useNavigate()
    
    return (
        <main className="min-h-[calc(100vh-72px)] bg-gradient-to-b from-slate-950 via-slate-900 to-slate-800 text-white px-6 py-12 sm:px-12">
            <div className="mx-auto max-w-6xl">
                <section className="rounded-[32px] border border-white/10 bg-slate-950/80 p-8 shadow-[0_35px_120px_-40px_rgba(59,130,246,0.75)] backdrop-blur-md sm:p-12">
                    <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
                        <div className="max-w-2xl space-y-6">
                            <p className="inline-flex rounded-full bg-sky-500/10 px-4 py-2 text-sm font-semibold uppercase tracking-[0.3em] text-sky-300">
                                Bem-vindo ao MedSync
                            </p>
                            <h1 className="text-4xl font-black tracking-tight text-white sm:text-5xl">
                                Conecte pacientes, médicos e administradores com estilo.
                            </h1>
                            <p className="max-w-xl text-lg leading-8 text-slate-300">
                                Plataforma moderna para gerenciar consultas, equipes e pacientes. Escolha sua jornada e faça login ou inicie seu cadastro.
                            </p>
                            <div className="grid gap-4 sm:grid-cols-3">
                                <button 
                                    onClick={() => navigate("login")} 
                                    className="rounded-full bg-sky-500 px-6 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-slate-950 transition hover:bg-sky-400"
                                >
                                    Login
                                </button>
                                <button 
                                    onClick={() => navigate("cadastro-medico")} 
                                    className="rounded-full bg-slate-700/80 px-6 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-white transition hover:bg-slate-600/95"
                                >
                                    Médico
                                </button>
                                <button 
                                    onClick={() => navigate("cadastro-paciente")} 
                                    className="rounded-full bg-slate-700/80 px-6 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-white transition hover:bg-slate-600/95"
                                >
                                    Paciente
                                </button>
                            </div>
                        </div>
                        <div className="rounded-[28px] border border-white/10 bg-slate-900/80 p-6 shadow-2xl shadow-slate-950/20 sm:p-8">
                            <div className="space-y-6">
                                <div className="rounded-3xl bg-slate-950 p-6 ring-1 ring-white/10">
                                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-300">Admin</p>
                                    <p className="mt-4 text-lg font-semibold text-white">Controle total do sistema</p>
                                    <p className="mt-2 text-sm leading-6 text-slate-400">Gerencie usuários, revise relatórios e configure horários de atendimento com segurança.</p>
                                </div>
                                <div className="rounded-3xl bg-slate-950 p-6 ring-1 ring-white/10">
                                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-300">Médico</p>
                                    <p className="mt-4 text-lg font-semibold text-white">Visualize sua agenda</p>
                                    <p className="mt-2 text-sm leading-6 text-slate-400">Acesse pacientes, notas e histórico clínico em um painel rápido e organizado.</p>
                                </div>
                                <div className="rounded-3xl bg-slate-950 p-6 ring-1 ring-white/10">
                                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-300">Paciente</p>
                                    <p className="mt-4 text-lg font-semibold text-white">Acompanhe seu atendimento</p>
                                    <p className="mt-2 text-sm leading-6 text-slate-400">Agende, veja resultados e converse com seu médico em um espaço seguro e direto.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    )
}
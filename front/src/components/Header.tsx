import { useNavigate } from 'react-router-dom';
import { Stethoscope, LogOut } from 'lucide-react';

interface HeaderProps{
    setTipoLogin: (a: string) => void
}

export default function HomeHeaderFlex({setTipoLogin}: HeaderProps) {
    const navigate = useNavigate()

    const tipoLogin = localStorage.getItem('tipoLogin') as 'paciente' | 'medico' | null
    const isAuthenticated = !!tipoLogin

    function handleLogout() {
        setTipoLogin("")
        localStorage.removeItem('userId')
        navigate('/')
    }

    const isPaciente = tipoLogin === 'paciente'
    const corAcento = isPaciente ? '#38bdf8' : '#34d399'
    const corAcentoRgb = isPaciente ? '56,189,248' : '52,211,153'
    const labelTipo = isPaciente ? 'Paciente' : 'Médico'

    return (
        <header className="w-full px-6 sm:px-12 py-4 bg-gradient-to-br from-slate-950 to-blue-900 border-b border-sky-500/20">
            <div className="flex items-center justify-between w-full max-w-[1920px] mx-auto">

                {/* Logo */}
                <div className="flex-none flex items-center gap-3 group cursor-pointer">
                    <div className="p-2 rounded-xl transition-all group-hover:scale-110 bg-sky-500/15 border border-sky-500/40">
                        <Stethoscope className="w-6 h-6 text-sky-400" />
                    </div>
                    <button onClick={() => navigate("/")} className="text-xl font-black tracking-tighter text-white">
                        MED<span className="text-sky-400">SYNC</span>
                    </button>
                </div>

                {/* Badge + botão Sair — só aparece quando logado */}
                {isAuthenticated && (
                    <div className="flex items-center gap-3">
                        <span className="text-xs font-semibold uppercase tracking-widest rounded-full px-3 py-1"
                            style={{
                                color: corAcento,
                                background: `rgba(${corAcentoRgb}, 0.1)`,
                                border: `1px solid rgba(${corAcentoRgb}, 0.25)`
                            }}>
                            {labelTipo}
                        </span>
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest rounded-full px-4 py-2 transition-all"
                            style={{
                                color: corAcento,
                                background: `rgba(${corAcentoRgb}, 0.08)`,
                                border: `1px solid rgba(${corAcentoRgb}, 0.2)`
                            }}
                            onMouseEnter={e => {
                                e.currentTarget.style.background = `rgba(${corAcentoRgb}, 0.2)`
                                e.currentTarget.style.borderColor = corAcento
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.style.background = `rgba(${corAcentoRgb}, 0.08)`
                                e.currentTarget.style.borderColor = `rgba(${corAcentoRgb}, 0.2)`
                            }}
                        >
                            <LogOut size={14} />
                            Sair
                        </button>
                    </div>
                )}

            </div>
        </header>
    );
}

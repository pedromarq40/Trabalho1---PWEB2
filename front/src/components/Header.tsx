import { useNavigate } from 'react-router-dom';
import { Stethoscope} from 'lucide-react';

export default function HomeHeaderFlex() {
    const navigate = useNavigate()

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

            </div>
        </header>
    );
}
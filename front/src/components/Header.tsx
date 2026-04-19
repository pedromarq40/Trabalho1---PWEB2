import { useNavigate } from 'react-router-dom';
import { Stethoscope} from 'lucide-react';

export default function HomeHeaderFlex() {
    const navigate = useNavigate()

    return (
        <header className="w-full px-6 sm:px-12 py-4" style={{
            background: 'linear-gradient(135deg, #0f172a 0%, #1e3a5f 100%)',
            borderBottom: '1px solid rgba(56, 139, 253, 0.2)'
        }}>
            <div className="flex items-center justify-between w-full max-w-[1920px] mx-auto">

                {/* Logo */}
                <div className="flex-none flex items-center gap-3 group cursor-pointer">
                    <div className="p-2 rounded-xl transition-all group-hover:scale-110" style={{
                        background: 'rgba(56, 139, 253, 0.15)',
                        border: '1px solid rgba(56, 139, 253, 0.4)'
                    }}>
                        <Stethoscope className="w-6 h-6" style={{ color: '#60a5fa' }} />
                    </div>
                    <button onClick={() => navigate("/")} className="text-xl font-black tracking-tighter text-white">
                        MED<span style={{ color: '#60a5fa' }}>SYNC</span>
                    </button>
                </div>

            </div>
        </header>
    );
}
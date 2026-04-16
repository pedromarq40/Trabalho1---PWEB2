import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Stethoscope, Menu, X } from 'lucide-react';

export default function HomeHeaderFlex() {
    const navigate = useNavigate()
    const [isOpen, setIsOpen] = useState(false);

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

                {/* Mobile Toggle */}
                <div className="md:hidden">
                    <button onClick={() => setIsOpen(!isOpen)} className="text-white/80">
                        {isOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>
            </div>

            {/* Menu Mobile */}
            {isOpen && (
                <div className="fixed inset-0 top-[65px] z-[100] flex flex-col p-8 gap-6 md:hidden bg-slate-950 border-t border-sky-400/20">
                    <a href="#" className="text-xl font-bold pb-4 text-white/80 border-b border-white/8">Contato</a>
                    <a href="#" className="text-xl font-bold pb-4 text-white/80 border-b border-white/8">Sobre nós</a>
                </div>
            )}
        </header>
    );
}
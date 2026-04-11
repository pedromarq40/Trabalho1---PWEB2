import React, { useState } from 'react';
import { Stethoscope, Menu, X } from 'lucide-react';

export default function HomeHeaderFlex() {
  const [isOpen, setIsOpen] = useState(false);

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
          <span className="text-xl font-black tracking-tighter text-white">
            MED<span style={{ color: '#60a5fa' }}>SYNC</span>
          </span>
        </div>

        {/* Nav Desktop */}
        <nav className="hidden md:flex flex-1 justify-center items-center gap-10">
          <a href="#" className="text-sm font-semibold uppercase tracking-widest transition-all" style={{ color: 'rgba(255,255,255,0.55)' }}
            onMouseEnter={e => (e.currentTarget.style.color = '#60a5fa')}
            onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.55)')}>
            Contato
          </a>
          <a href="#" className="text-sm font-semibold uppercase tracking-widest transition-all" style={{ color: 'rgba(255,255,255,0.55)' }}
            onMouseEnter={e => (e.currentTarget.style.color = '#60a5fa')}
            onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.55)')}>
            Sobre nós
          </a>
        </nav>

        {/* Botão Direito */}
        <div className="hidden md:flex flex-none items-center gap-4">
          <button className="text-sm font-bold px-6 py-2.5 rounded-full transition-all" style={{
            background: 'rgba(96, 165, 250, 0.15)',
            border: '1px solid rgba(96, 165, 250, 0.5)',
            color: '#60a5fa'
          }}
            onMouseEnter={e => {
              e.currentTarget.style.background = '#3b82f6';
              e.currentTarget.style.color = '#fff';
              e.currentTarget.style.borderColor = '#3b82f6';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'rgba(96, 165, 250, 0.15)';
              e.currentTarget.style.color = '#60a5fa';
              e.currentTarget.style.borderColor = 'rgba(96, 165, 250, 0.5)';
            }}>
            Agendar Consulta
          </button>
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} style={{ color: 'rgba(255,255,255,0.8)' }}>
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Menu Mobile */}
      {isOpen && (
        <div className="fixed inset-0 top-[65px] z-[100] flex flex-col p-8 gap-6 md:hidden" style={{
          background: '#0f172a',
          borderTop: '1px solid rgba(96, 165, 250, 0.2)'
        }}>
          <a href="#" className="text-xl font-bold pb-4" style={{
            color: 'rgba(255,255,255,0.8)',
            borderBottom: '1px solid rgba(255,255,255,0.08)'
          }}>Contato</a>
          <a href="#" className="text-xl font-bold pb-4" style={{
            color: 'rgba(255,255,255,0.8)',
            borderBottom: '1px solid rgba(255,255,255,0.08)'
          }}>Sobre nós</a>
          <button className="mt-4 py-3 rounded-xl font-bold text-white" style={{
            background: '#3b82f6'
          }}>
            Agendar Consulta
          </button>
        </div>
      )}
    </header>
  );
}
'use client';

import { useState } from 'react';

export default function ContactoPage() {
  const [formData, setFormData] = useState({
    nombre: '',
    telefono: '',
    servicio: 'Balayage',
    mensaje: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Generar enlace directo a WhatsApp con los datos ingresados
    const texto = `Hola, mi nombre es ${formData.nombre}. Quisiera información sobre ${formData.servicio}. ${formData.mensaje}`;
    const url = `https://wa.me/51999999999?text=${encodeURIComponent(texto)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-pink-600 selection:text-white">
      
      {/* --- NAVBAR --- */}
      <header className="sticky top-0 z-50 bg-black/80 backdrop-blur-md border-b border-zinc-900">
        <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
          {/* Logo estilo Nova */}
          <a href="/" className="text-2xl font-black tracking-tighter text-white">
            STUDIO <span className="text-pink-500">&</span> STYLES
          </a>

          {/* Menú de navegación */}
          <nav className="hidden md:flex space-x-8 text-sm font-semibold tracking-wide">
            <a href="/" className="text-zinc-400 hover:text-white transition">Inicio</a>
            <a href="/#servicios" className="text-zinc-400 hover:text-white transition">Servicios</a>
            <a href="#" className="text-zinc-400 hover:text-white transition">Portafolio</a>
            <a href="#" className="text-zinc-400 hover:text-white transition">Sobre Nosotros</a>
            <a href="/contacto" className="text-pink-500 border-b-2 border-pink-500 pb-1">Contáctanos</a>
          </nav>
        </div>
      </header>

      {/* --- HERO / CONTÁCTANOS SECTION --- */}
      <section className="relative min-h-[calc(100vh-80px)] flex items-center">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center px-6 py-12">
          
          {/* Columna Izquierda: Texto e Identidad */}
          <div className="space-y-6">
            <span className="text-pink-500 text-xs md:text-sm font-bold tracking-widest uppercase">
              CONTÁCTANOS
            </span>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tight leading-[1.1]">
              HABLEMOS DE <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-rose-400">
                TU PRÓXIMO
              </span> <br />
              CAMBIO DE LOOK
            </h1>

            <p className="text-zinc-400 text-base md:text-lg max-w-lg leading-relaxed font-normal">
              En Studio & Styles creamos experiencias únicas para resaltar tu estilo personal. 
              Cuéntanos tu idea o el tratamiento que buscas y nuestro equipo te asesorará de inmediato.
            </p>

            {/* Formulario rápido e integrado */}
            <form onSubmit={handleSubmit} className="space-y-4 pt-4 max-w-md">
              <div>
                <input 
                  type="text" 
                  placeholder="Tu Nombre" 
                  required
                  value={formData.nombre}
                  onChange={(e) => setFormData({...formData, nombre: e.target.value})}
                  className="w-full bg-zinc-900/80 border border-zinc-800 rounded-lg px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-pink-500 transition"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <input 
                  type="tel" 
                  placeholder="Teléfono / WhatsApp" 
                  required
                  value={formData.telefono}
                  onChange={(e) => setFormData({...formData, telefono: e.target.value})}
                  className="bg-zinc-900/80 border border-zinc-800 rounded-lg px-4 py-3 text-white placeholder-zinc-500 focus:outline-none focus:border-pink-500 transition"
                />

                <select 
                  value={formData.servicio}
                  onChange={(e) => setFormData({...formData, servicio: e.target.value})}
                  className="bg-zinc-900/80 border border-zinc-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-pink-500 transition"
                >
                  <option value="Balayage">Tinte Balayage</option>
                  <option value="Corte">Corte & Cepillado</option>
                  <option value="Tratamiento">Tratamiento Capilar</option>
                  <option value="Manicure">Manicure / Uñas</option>
                </select>
              </div>

              <button 
                type="submit" 
                className="bg-gradient-to-r from-pink-600 to-pink-500 hover:from-pink-500 hover:to-pink-400 text-white font-bold px-8 py-3.5 rounded-full flex items-center justify-center gap-2 group transition duration-300 shadow-lg shadow-pink-600/30 uppercase text-sm tracking-wider"
              >
                <span>Escríbenos</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </button>
            </form>
          </div>

          {/* Columna Derecha: Imagen destacada con sombra magenta */}
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-pink-600 to-rose-600 rounded-2xl blur-xl opacity-30 animate-pulse"></div>
            <div className="relative rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-900 aspect-[4/3] md:aspect-square">
              <img 
                src="https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=1000&auto=format&fit=crop" 
                alt="Salon Studio" 
                className="w-full h-full object-cover object-center opacity-80 hover:opacity-100 transition duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
            </div>
          </div>

        </div>
      </section>

      {/* --- BOTÓN FLOTANTE WHATSAPP --- */}
      <a 
        href="https://wa.me/51999999999?text=Hola,%20quisiera%20más%20información" 
        target="_blank"
        className="fixed bottom-6 right-6 z-50 bg-emerald-500 hover:bg-emerald-600 text-white p-4 rounded-full shadow-2xl transition hover:scale-110 flex items-center justify-center"
      >
        <svg className="w-7 h-7 fill-current" viewBox="0 0 24 24">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z"/>
        </svg>
      </a>

    </div>
  );
}
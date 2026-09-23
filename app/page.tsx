'use client';

import { useEffect, useState } from 'react';

interface Servicio {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  url_imagen: string;
  estado: boolean;
}

export default function Home() {
  const [servicios, setServicios] = useState<Servicio[]>([]);
  const [email, setEmail] = useState('');
  const [mensajeSuscripcion, setMensajeSuscripcion] = useState('');
  const [faqAbierta, setFaqAbierta] = useState<number | null>(0);
  const [activeSection, setActiveSection] = useState('inicio');

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/servicios')
      .then((res) => res.json())
      .then((data) => setServicios(data))
      .catch((err) => console.error('Error al conectar con el backend:', err));
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['inicio', 'beneficios', 'servicios', 'portafolio', 'testimonios', 'faq'];
      const scrollPosition = window.scrollY + 250;

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSuscripcion = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setMensajeSuscripcion('¡Suscripción exitosa! Te enviamos tu cupón del 15% OFF.');
      setEmail('');
    }
  };

  const navLinks = [
    { id: 'inicio', label: 'Inicio' },
    { id: 'beneficios', label: 'Nosotros' },
    { id: 'servicios', label: 'Servicios' },
    { id: 'portafolio', label: 'Galería' },
    { id: 'testimonios', label: 'Reseñas' },
    { id: 'faq', label: 'FAQ' },
  ];

  const preguntasFrecuentes = [
    {
      q: '¿Cuánto tiempo dura una sesión de Balayage?',
      a: 'Aproximadamente de 3 a 4 horas. Nos tomamos el tiempo necesario para cuidar la hebra capilar con matizadores e hidratación sin dañarlo.'
    },
    {
      q: '¿Qué marcas de tintes y tratamientos utilizan?',
      a: 'Trabajamos exclusivamente con líneas profesionales de alta gama como Olaplex, Wella Professionals y Schwarzkopf Professional.'
    },
    {
      q: '¿Necesito agendar cita con anticipación?',
      a: 'Sí, recomendamos agendar con al menos 24 a 48 horas de anticipación vía WhatsApp para garantizar la disponibilidad de nuestros estilistas senior.'
    },
    {
      q: '¿Tienen garantía si el color no alcanza el tono deseado?',
      a: '¡Por supuesto! Ofrecemos 7 días de garantía para retoques de matiz o evaluaciones post-tratamiento totalmente gratis.'
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-pink-600 selection:text-white scroll-smooth overflow-x-hidden">
      
      {/* --- NAVBAR FLOTANTE CON EFECTO GLASS + BORDES NEÓN --- */}
      <header className="sticky top-0 z-50 bg-black/80 backdrop-blur-2xl border-b border-pink-500/20 shadow-2xl shadow-pink-950/20 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
          <a href="#inicio" className="text-2xl font-black tracking-tighter text-white group flex items-center gap-1">
            <span>STUDIO</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-rose-400 group-hover:scale-125 transition duration-300">
              &
            </span>
            <span>STYLES</span>
          </a>

          <nav className="hidden lg:flex space-x-8 text-sm font-semibold tracking-wide items-center">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                className={`transition-all duration-300 py-1 border-b-2 relative ${
                  activeSection === link.id
                    ? 'text-pink-400 border-pink-500 font-bold scale-105'
                    : 'text-zinc-400 hover:text-white border-transparent'
                }`}
              >
                {link.label}
              </a>
            ))}

            <a href="/contacto" className="text-zinc-400 hover:text-white transition py-1 border-b-2 border-transparent">
              Contacto
            </a>

            <a href="/dashboard" className="text-zinc-500 hover:text-pink-400 text-xs uppercase tracking-wider transition">
              Admin
            </a>

            <a 
              href="https://wa.me/51999999999?text=Hola,%20quisiera%20reservar%20una%20cita" 
              target="_blank" 
              className="relative group overflow-hidden rounded-full p-[2px] focus:outline-none"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 rounded-full animate-gradient"></span>
              <span className="relative block px-6 py-2.5 bg-black rounded-full text-xs font-bold uppercase tracking-wider text-white group-hover:bg-transparent transition duration-300">
                Reservar Cita
              </span>
            </a>
          </nav>
        </div>
      </header>

      {/* =========================================================================
          SECCIÓN 1: HERO (PÚRPURA / MAGENTA OSCURO CON LUZ AMBIENTAL DENTRO)
         ========================================================================= */}
      <section id="inicio" className="relative min-h-[92vh] flex items-center justify-center overflow-hidden border-b border-pink-900/40 bg-gradient-to-b from-purple-950/40 via-black to-black">
        {/* Imagen de Fondo Flotante con Mezcla */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30 animate-float mix-blend-luminosity"
          style={{ 
            backgroundImage: `url('https://images.unsplash.com/photo-1562322140-8baeececf3df?q=80&w=1920&auto=format&fit=crop')` 
          }}
        ></div>

        {/* Esferas Gigantes de Luz Pulsante */}
        <div className="absolute -top-10 left-1/4 w-[500px] h-[500px] bg-pink-600/30 rounded-full blur-[180px] animate-pulse-glow pointer-events-none"></div>
        <div className="absolute bottom-10 right-1/4 w-[450px] h-[450px] bg-purple-700/25 rounded-full blur-[160px] animate-pulse-glow pointer-events-none"></div>

        <div className="relative max-w-5xl mx-auto px-6 text-center space-y-8 z-10 py-20 animate-fade-in-up">
          <div className="inline-flex items-center gap-3 bg-pink-950/80 border border-pink-500/50 text-pink-300 text-xs font-bold px-5 py-2.5 rounded-full uppercase tracking-widest backdrop-blur-xl shadow-2xl shadow-pink-600/30">
            <span className="w-2.5 h-2.5 rounded-full bg-pink-400 animate-ping"></span>
            Studio Professional & High-End Hair Care
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tight leading-[1.02]">
            REDEFINIENDO TU <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-rose-300 to-purple-400 animate-gradient">
              ESTILO & BELLEZA
            </span>
          </h1>

          <p className="text-zinc-300 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-light">
            Especialistas en decoloración avanzada, balayage y tratamientos capilares orgánicos. Dale a tu cabello el brillo y volumen que merece.
          </p>

          <div className="flex flex-col sm:flex-row gap-5 justify-center pt-4">
            <a 
              href="#servicios" 
              className="relative group bg-gradient-to-r from-pink-600 via-rose-500 to-purple-600 text-white font-bold px-10 py-4 rounded-full shadow-2xl shadow-pink-600/50 transition transform hover:-translate-y-1.5 hover:scale-105 uppercase text-xs tracking-widest flex items-center justify-center gap-2 overflow-hidden"
            >
              <span className="relative z-10">Explorar Servicios ↓</span>
              <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            </a>
            <a 
              href="https://wa.me/51999999999?text=Hola,%20deseo%20una%20evaluación%20capilar" 
              target="_blank"
              className="bg-zinc-900/90 hover:bg-zinc-800 border border-pink-500/30 hover:border-pink-500 text-white font-bold px-10 py-4 rounded-full backdrop-blur-md transition transform hover:-translate-y-1.5 hover:scale-105 uppercase text-xs tracking-widest shadow-xl"
            >
              Evaluación Capilar Gratis
            </a>
          </div>

          {/* Métricas con Estilo Glassmorphic */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-12 border-t border-pink-500/20 max-w-4xl mx-auto">
            <div className="p-5 rounded-3xl bg-zinc-900/80 border border-pink-500/20 backdrop-blur-md hover:border-pink-500 transition transform hover:scale-105 shadow-xl">
              <p className="text-3xl md:text-4xl font-black text-white">+1,800</p>
              <p className="text-pink-400 text-xs uppercase mt-1 font-bold">Clientes Atendidas</p>
            </div>
            <div className="p-5 rounded-3xl bg-zinc-900/80 border border-pink-500/20 backdrop-blur-md hover:border-pink-500 transition transform hover:scale-105 shadow-xl">
              <p className="text-3xl md:text-4xl font-black text-pink-400">4.9 ★</p>
              <p className="text-pink-400 text-xs uppercase mt-1 font-bold">Reseñas Google</p>
            </div>
            <div className="p-5 rounded-3xl bg-zinc-900/80 border border-pink-500/20 backdrop-blur-md hover:border-pink-500 transition transform hover:scale-105 shadow-xl">
              <p className="text-3xl md:text-4xl font-black text-white">+8 Años</p>
              <p className="text-pink-400 text-xs uppercase mt-1 font-bold">Experiencia</p>
            </div>
            <div className="p-5 rounded-3xl bg-zinc-900/80 border border-pink-500/20 backdrop-blur-md hover:border-pink-500 transition transform hover:scale-105 shadow-xl">
              <p className="text-3xl md:text-4xl font-black text-pink-400">100%</p>
              <p className="text-pink-400 text-xs uppercase mt-1 font-bold">Garantía Color</p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECCIÓN 2: BENEFICIOS (FONDO EN MALLA NEÓN CON DEGRADADO AZUL/ROSA)
         ========================================================================= */}
      <section id="beneficios" className="py-28 px-6 border-b border-pink-900/30 bg-zinc-950 bg-grid-neon relative overflow-hidden">
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-pink-600/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-20 space-y-3">
            <span className="text-pink-400 text-xs font-black tracking-widest uppercase bg-pink-950/80 border border-pink-500/30 px-4 py-1.5 rounded-full">
              LA EXPERIENCIA STUDIO & STYLES
            </span>
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight text-white">¿POR QUÉ ELEGIRNOS?</h2>
            <p className="text-zinc-400 text-base">Cuidamos la salud integral de tu cabello antes, durante y después de cada proceso.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group relative bg-gradient-to-b from-zinc-900/90 to-black p-9 rounded-3xl border border-zinc-800 hover:border-pink-500 transition-all duration-500 transform hover:-translate-y-4 hover:shadow-2xl hover:shadow-pink-600/20">
              <div className="w-16 h-16 bg-pink-600/20 border border-pink-500/40 rounded-2xl flex items-center justify-center text-pink-400 font-bold text-3xl mb-6 group-hover:scale-110 group-hover:bg-pink-600 group-hover:text-white transition duration-300 shadow-lg shadow-pink-600/20">
                ✨
              </div>
              <h3 className="text-2xl font-bold uppercase tracking-wide text-white mb-3 group-hover:text-pink-400 transition">Diagnóstico Gratis</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Analizamos la porosidad y resistencia de tu hebra capilar antes de aplicar cualquier decoloración.
              </p>
            </div>

            <div className="group relative bg-gradient-to-b from-zinc-900/90 to-black p-9 rounded-3xl border border-zinc-800 hover:border-pink-500 transition-all duration-500 transform hover:-translate-y-4 hover:shadow-2xl hover:shadow-pink-600/20">
              <div className="w-16 h-16 bg-pink-600/20 border border-pink-500/40 rounded-2xl flex items-center justify-center text-pink-400 font-bold text-3xl mb-6 group-hover:scale-110 group-hover:bg-pink-600 group-hover:text-white transition duration-300 shadow-lg shadow-pink-600/20">
                🌿
              </div>
              <h3 className="text-2xl font-bold uppercase tracking-wide text-white mb-3 group-hover:text-pink-400 transition">Productos Veganos</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Fórmulas sin sulfatos ni parabenos con tecnología Plex para mantener tu cabello fuerte e hidratado.
              </p>
            </div>

            <div className="group relative bg-gradient-to-b from-zinc-900/90 to-black p-9 rounded-3xl border border-zinc-800 hover:border-pink-500 transition-all duration-500 transform hover:-translate-y-4 hover:shadow-2xl hover:shadow-pink-600/20">
              <div className="w-16 h-16 bg-pink-600/20 border border-pink-500/40 rounded-2xl flex items-center justify-center text-pink-400 font-bold text-3xl mb-6 group-hover:scale-110 group-hover:bg-pink-600 group-hover:text-white transition duration-300 shadow-lg shadow-pink-600/20">
                👑
              </div>
              <h3 className="text-2xl font-bold uppercase tracking-wide text-white mb-3 group-hover:text-pink-400 transition">Sesión Exclusiva</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Atendemos con agenda personalizada para darte el tiempo y dedicación exclusiva que mereces.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECCIÓN 3: SERVICIOS (FONDO DEGRADADO DIAGONAL ROJO/VINO PROFUNDO)
         ========================================================================= */}
      <section id="servicios" className="py-28 px-6 border-b border-pink-900/30 bg-gradient-to-br from-black via-rose-950/40 to-black bg-lines-pattern">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4 border-b border-pink-900/40 pb-8">
            <div>
              <span className="text-pink-400 text-xs font-black tracking-widest uppercase">CATÁLOGO EN VIVO</span>
              <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight mt-1 text-white">NUESTROS SERVICIOS</h2>
            </div>
            <p className="text-zinc-400 text-sm max-w-md">
              Sincronizado en tiempo real desde la API backend.
            </p>
          </div>

          {servicios.length === 0 ? (
            <div className="text-center py-20 text-zinc-400 animate-pulse bg-zinc-900/50 rounded-3xl border border-pink-500/30">
              Conectando con el servidor Python backend...
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {servicios.map((servicio) => (
                <div 
                  key={servicio.id} 
                  className="group bg-zinc-900/90 border border-zinc-800 rounded-3xl overflow-hidden hover:border-pink-500 transition duration-500 transform hover:-translate-y-3 flex flex-col justify-between hover:shadow-2xl hover:shadow-pink-600/20"
                >
                  <div>
                    <div className="relative aspect-[4/3] overflow-hidden bg-black">
                      <img 
                        src={servicio.url_imagen} 
                        alt={servicio.nombre} 
                        className="w-full h-full object-cover group-hover:scale-110 transition duration-700 opacity-80 group-hover:opacity-100"
                      />
                      <div className="absolute top-4 right-4 bg-black/90 backdrop-blur-md px-4 py-1.5 rounded-full border border-pink-500/50 text-pink-400 font-black text-sm shadow-xl">
                        S/ {servicio.precio.toFixed(2)}
                      </div>
                    </div>

                    <div className="p-8 space-y-3">
                      <h3 className="text-2xl font-bold uppercase tracking-wide text-white group-hover:text-pink-400 transition">
                        {servicio.nombre}
                      </h3>
                      <p className="text-zinc-400 text-sm leading-relaxed">
                        {servicio.descripcion}
                      </p>
                    </div>
                  </div>

                  <div className="p-8 pt-0">
                    <a 
                      href={`https://wa.me/51999999999?text=Hola,%20quisiera%20agendar%20el%20servicio:%20${servicio.nombre}`} 
                      target="_blank"
                      className="w-full bg-gradient-to-r from-zinc-800 to-zinc-900 hover:from-pink-600 hover:to-rose-500 text-white font-bold py-4 rounded-xl transition duration-300 text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg group-hover:shadow-pink-600/30"
                    >
                      <span>Consultar Cita</span>
                      <span className="transform group-hover:translate-x-1 transition">→</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* =========================================================================
          SECCIÓN 4: PORTAFOLIO (NEGRO PURO CON EFECTOS DE RESPLANDOR NEÓN A LOS LADOS)
         ========================================================================= */}
      <section id="portafolio" className="py-28 px-6 border-b border-pink-900/30 bg-black relative">
        <div className="absolute -left-20 top-1/3 w-80 h-80 bg-pink-600/20 rounded-full blur-[140px] pointer-events-none"></div>
        <div className="absolute -right-20 bottom-1/3 w-80 h-80 bg-purple-600/20 rounded-full blur-[140px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-20 space-y-3">
            <span className="text-pink-400 text-xs font-black tracking-widest uppercase bg-pink-950/80 border border-pink-500/30 px-4 py-1.5 rounded-full">
              RESULTADOS REALES
            </span>
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight text-white">TRANSFORMACIONES</h2>
            <p className="text-zinc-400 text-base">Explora las trasformaciones creadas por nuestras estilistas.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="relative group rounded-3xl overflow-hidden border border-zinc-800 hover:border-pink-500 aspect-[4/5] bg-zinc-900 shadow-2xl transform hover:scale-[1.03] transition duration-500">
              <img 
                src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=800&auto=format&fit=crop" 
                alt="Balayage Honey Blonde" 
                className="w-full h-full object-cover group-hover:scale-110 transition duration-700 opacity-75 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent opacity-90"></div>
              <div className="absolute bottom-6 left-6 right-6 space-y-2 transform group-hover:-translate-y-2 transition duration-300">
                <span className="bg-pink-600 text-white text-[11px] font-bold uppercase px-3 py-1 rounded-full shadow-lg">
                  Balayage Honey Blonde
                </span>
                <h4 className="text-2xl font-bold text-white pt-1">Iluminación Natural</h4>
                <p className="text-xs text-zinc-300">Tono degradado sin efecto raíz agresivo.</p>
              </div>
            </div>

            <div className="relative group rounded-3xl overflow-hidden border border-zinc-800 hover:border-pink-500 aspect-[4/5] bg-zinc-900 shadow-2xl transform hover:scale-[1.03] transition duration-500">
              <img 
                src="https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=800&auto=format&fit=crop" 
                alt="Corte Bob Styling" 
                className="w-full h-full object-cover group-hover:scale-110 transition duration-700 opacity-75 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent opacity-90"></div>
              <div className="absolute bottom-6 left-6 right-6 space-y-2 transform group-hover:-translate-y-2 transition duration-300">
                <span className="bg-pink-600 text-white text-[11px] font-bold uppercase px-3 py-1 rounded-full shadow-lg">
                  Corte Bob & Styling
                </span>
                <h4 className="text-2xl font-bold text-white pt-1">Corte Moderno</h4>
                <p className="text-xs text-zinc-300">Aumento de volumen y definición facial.</p>
              </div>
            </div>

            <div className="relative group rounded-3xl overflow-hidden border border-zinc-800 hover:border-pink-500 aspect-[4/5] bg-zinc-900 shadow-2xl transform hover:scale-[1.03] transition duration-500">
              <img 
                src="https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?q=80&w=800&auto=format&fit=crop" 
                alt="Color Fantasía" 
                className="w-full h-full object-cover group-hover:scale-110 transition duration-700 opacity-75 group-hover:opacity-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent opacity-90"></div>
              <div className="absolute bottom-6 left-6 right-6 space-y-2 transform group-hover:-translate-y-2 transition duration-300">
                <span className="bg-pink-600 text-white text-[11px] font-bold uppercase px-3 py-1 rounded-full shadow-lg">
                  Color Fuego Neón
                </span>
                <h4 className="text-2xl font-bold text-white pt-1">Tinte Fantasía</h4>
                <p className="text-xs text-zinc-300">Pigmentación intensa con sellado térmico.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECCIÓN 5: TESTIMONIOS (FONDO VIOLETA PROFUNDO DE ALTO CONTRASTE)
         ========================================================================= */}
      <section id="testimonios" className="py-28 px-6 border-b border-pink-900/30 bg-gradient-to-tr from-purple-950/40 via-zinc-950 to-pink-950/40">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-20 space-y-3">
            <span className="text-pink-400 text-xs font-black tracking-widest uppercase bg-pink-950/80 border border-pink-500/30 px-4 py-1.5 rounded-full">
              TESTIMONIOS VERIFICADOS
            </span>
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight text-white">LO QUE DICEN NUESTRAS CLIENTAS</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-zinc-900/80 border border-zinc-800 p-8 rounded-3xl space-y-5 hover:border-pink-500 transition duration-300 transform hover:-translate-y-2 shadow-xl">
              <div className="text-pink-400 font-bold text-base tracking-widest">★★★★★</div>
              <p className="text-zinc-300 text-sm leading-relaxed italic">
                "Me hice el Balayage con aclarado extremo y mi cabello quedó súper suave. Usaron Olaplex y el resultado superó mis expectativas."
              </p>
              <div className="pt-4 border-t border-zinc-800/80 flex items-center gap-4">
                <div className="w-11 h-11 rounded-full bg-pink-600/30 text-pink-400 font-bold flex items-center justify-center text-sm border border-pink-500/40">
                  CV
                </div>
                <div>
                  <h5 className="font-bold text-base text-white">Camila Vargas</h5>
                  <p className="text-zinc-500 text-xs">Cliente Balayage</p>
                </div>
              </div>
            </div>

            <div className="bg-zinc-900/80 border border-zinc-800 p-8 rounded-3xl space-y-5 hover:border-pink-500 transition duration-300 transform hover:-translate-y-2 shadow-xl">
              <div className="text-pink-400 font-bold text-base tracking-widest">★★★★★</div>
              <p className="text-zinc-300 text-sm leading-relaxed italic">
                "La atención desde que llegas es excelente. Te hacen una prueba de mecha previa para asegurar que el cabello resista el proceso."
              </p>
              <div className="pt-4 border-t border-zinc-800/80 flex items-center gap-4">
                <div className="w-11 h-11 rounded-full bg-pink-600/30 text-pink-400 font-bold flex items-center justify-center text-sm border border-pink-500/40">
                  AM
                </div>
                <div>
                  <h5 className="font-bold text-base text-white">Andrea Morales</h5>
                  <p className="text-zinc-500 text-xs">Cliente Frecuente</p>
                </div>
              </div>
            </div>

            <div className="bg-zinc-900/80 border border-zinc-800 p-8 rounded-3xl space-y-5 hover:border-pink-500 transition duration-300 transform hover:-translate-y-2 shadow-xl">
              <div className="text-pink-400 font-bold text-base tracking-widest">★★★★★</div>
              <p className="text-zinc-300 text-sm leading-relaxed italic">
                "Me encantó el peinado y maquillaje para mi evento. Duró intacto toda la noche y los productos se sienten súper livianos."
              </p>
              <div className="pt-4 border-t border-zinc-800/80 flex items-center gap-4">
                <div className="w-11 h-11 rounded-full bg-pink-600/30 text-pink-400 font-bold flex items-center justify-center text-sm border border-pink-500/40">
                  SL
                </div>
                <div>
                  <h5 className="font-bold text-base text-white">Sofia López</h5>
                  <p className="text-zinc-500 text-xs">Cliente Studio</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECCIÓN 6: FAQ (FONDO ZINC OSCURO CON PANELES CONTRASTADOS)
         ========================================================================= */}
      <section id="faq" className="py-28 px-6 border-b border-pink-900/30 bg-zinc-950">
        <div className="max-w-4xl mx-auto">
          <div className="text-center space-y-3 mb-16">
            <span className="text-pink-400 text-xs font-black tracking-widest uppercase bg-pink-950/80 border border-pink-500/30 px-4 py-1.5 rounded-full">
              RESPUESTAS RÁPIDAS
            </span>
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight text-white">PREGUNTAS FRECUENTES</h2>
          </div>

          <div className="space-y-4">
            {preguntasFrecuentes.map((item, idx) => (
              <div 
                key={idx} 
                className="bg-zinc-900/90 border border-zinc-800 rounded-2xl overflow-hidden transition duration-300 hover:border-pink-500/50 shadow-lg"
              >
                <button 
                  onClick={() => setFaqAbierta(faqAbierta === idx ? null : idx)}
                  className="w-full text-left p-6 font-bold text-base md:text-lg flex justify-between items-center hover:text-pink-400 transition"
                >
                  <span>{item.q}</span>
                  <span className={`text-pink-500 text-2xl font-black transition-transform duration-300 ${faqAbierta === idx ? 'rotate-180' : ''}`}>
                    ↓
                  </span>
                </button>

                {faqAbierta === idx && (
                  <div className="px-6 pb-6 text-zinc-300 text-sm leading-relaxed border-t border-zinc-800/80 pt-4 animate-fade-in-up">
                    {item.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECCIÓN 7: BANNER CTA (GRADIENTE EXTREMO EXPLOSIVO ROSA/MAGENTA/PÚRPURA)
         ========================================================================= */}
      <section id="suscripcion" className="py-24 px-6 bg-black relative">
        <div className="max-w-5xl mx-auto bg-gradient-to-r from-pink-900 via-rose-900 to-purple-900 border-2 border-pink-500/50 rounded-3xl p-10 md:p-16 text-center relative overflow-hidden shadow-2xl shadow-pink-600/40">
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-pink-500/40 rounded-full blur-3xl pointer-events-none animate-pulse-glow"></div>

          <div className="relative space-y-6 max-w-2xl mx-auto z-10">
            <span className="text-pink-300 text-xs font-black tracking-widest uppercase bg-black/40 px-4 py-1.5 rounded-full border border-pink-400/30">
              DESCUENTO DE LANZAMIENTO
            </span>
            <h3 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-white leading-tight">
              OBTÉN 15% OFF EN TU PRIMERA CITA
            </h3>
            <p className="text-pink-100 text-base leading-relaxed">
              Únete a nuestro club exclusivo VIP y recibe ofertas especiales directo a tu inbox.
            </p>

            <form onSubmit={handleSuscripcion} className="flex flex-col sm:flex-row gap-3 pt-4">
              <input 
                type="email" 
                placeholder="Ingresa tu correo electrónico" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-black/80 border border-pink-400/40 rounded-xl px-5 py-4 text-white placeholder-zinc-400 focus:outline-none focus:border-white transition flex-1 text-sm shadow-inner"
              />
              <button 
                type="submit" 
                className="bg-white hover:bg-pink-100 text-pink-950 font-black px-9 py-4 rounded-xl uppercase text-xs tracking-wider transition shadow-2xl transform hover:scale-105"
              >
                Suscribirme
              </button>
            </form>

            {mensajeSuscripcion && (
              <p className="text-emerald-300 text-xs font-bold pt-2 animate-fade-in-up">{mensajeSuscripcion}</p>
            )}
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="border-t border-zinc-900 py-12 px-6 bg-black">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
          <div>
            <h4 className="text-xl font-black tracking-tighter text-white">
              STUDIO <span className="text-pink-500">&</span> STYLES
            </h4>
            <p className="text-zinc-500 text-xs mt-1">Especialistas en estilo, tinte y cuidado capilar.</p>
          </div>

          <div className="flex space-x-6 text-xs text-zinc-400 font-semibold">
            <a href="#inicio" className="hover:text-white transition">Inicio</a>
            <a href="#servicios" className="hover:text-white transition">Servicios</a>
            <a href="/contacto" className="hover:text-white transition">Ubicación</a>
            <a href="/dashboard" className="hover:text-white transition">Administración</a>
          </div>

          <p className="text-zinc-600 text-xs uppercase tracking-widest">
            © 2026 STUDIO & STYLES. TODOS LOS DERECHOS RESERVADOS.
          </p>
        </div>
      </footer>

      {/* --- BOTÓN WHATSAPP CON PULSO Y EFECTO RESPLANDOR --- */}
      <a 
        href="https://wa.me/51999999999?text=Hola,%20quisiera%20agendar%20una%20cita" 
        target="_blank"
        className="fixed bottom-6 right-6 z-50 bg-emerald-500 hover:bg-emerald-600 text-white p-4 rounded-full shadow-2xl shadow-emerald-500/50 transition transform hover:scale-110 flex items-center justify-center group"
      >
        <span className="absolute -inset-1 rounded-full bg-emerald-500 opacity-75 animate-ping group-hover:opacity-0"></span>
        <svg className="w-7 h-7 fill-current relative z-10" viewBox="0 0 24 24">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z"/>
        </svg>
      </a>

    </div>
  );
}
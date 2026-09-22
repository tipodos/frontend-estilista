'use client';

import { useEffect, useState } from 'react';

// Tipado del servicio
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

  // 1. Conexión con tu Backend en Python
  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/servicios')
      .then((res) => res.json())
      .then((data) => setServicios(data))
      .catch((err) => console.error('Error al conectar con el backend:', err));
  }, []);

  // Manejo de la suscripción
  const handleSuscripcion = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setMensajeSuscripcion('¡Gracias por suscribirte! Revisa tu correo para tu cupón de descuento.');
      setEmail('');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans">
      
      {/* --- NAVBAR --- */}
      <nav className="bg-white shadow-sm sticky top-0 z-50 py-4 px-6 flex justify-between items-center max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold text-pink-600 tracking-wider">STUDIO & STYLES</h1>
        <div className="space-x-6 text-sm font-semibold">
          <a href="#inicio" className="hover:text-pink-600 transition">Inicio</a>
          <a href="#servicios" className="hover:text-pink-600 transition">Servicios</a>
          <a href="#suscripcion" className="hover:text-pink-600 transition">Descuentos</a>
          <a 
            href="https://wa.me/51999999999?text=Hola,%20quisiera%20reservar%20una%20cita" 
            target="_blank" 
            className="bg-pink-600 text-white px-4 py-2 rounded-full hover:bg-pink-700 transition"
          >
            Reservar Cita
          </a>
        </div>
      </nav>

      {/* --- HERO BANNER --- */}
      <section id="inicio" className="bg-gradient-to-r from-pink-500 to-rose-400 text-white py-20 px-6 text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight">Especialistas en Tintes & Estilo</h2>
          <p className="text-lg md:text-xl text-pink-100">
            Realza tu belleza con nuestros tratamientos capilares, balayage profesional y diseños exclusivos.
          </p>
          <a 
            href="#servicios" 
            className="inline-block bg-white text-pink-600 font-bold px-8 py-3 rounded-full shadow-lg hover:bg-slate-100 transition"
          >
            Ver Catálogo de Servicios
          </a>
        </div>
      </section>

      {/* --- SECCIÓN DE SERVICIOS (CONECTADO AL BACKEND) --- */}
      <section id="servicios" className="py-16 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold text-slate-900">Nuestros Servicios</h3>
          <p className="text-slate-500 mt-2">Atención personalizada con productos de alta calidad</p>
        </div>

        {servicios.length === 0 ? (
          <p className="text-center text-slate-400">Cargando servicios o servidor desconectado...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {servicios.map((servicio) => (
              <div key={servicio.id} className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition">
                <img 
                  src={servicio.url_imagen} 
                  alt={servicio.nombre} 
                  className="w-full h-48 object-cover"
                />
                <div className="p-6 space-y-3">
                  <h4 className="text-xl font-bold text-slate-800">{servicio.nombre}</h4>
                  <p className="text-slate-600 text-sm leading-relaxed">{servicio.descripcion}</p>
                  <div className="flex justify-between items-center pt-4 border-t border-slate-100">
                    <span className="text-2xl font-black text-pink-600">S/ {servicio.precio.toFixed(2)}</span>
                    <a 
                      href={`https://wa.me/51999999999?text=Hola,%20estoy%20interesada%20en%20el%20servicio:%20${servicio.nombre}`} 
                      target="_blank"
                      className="text-xs font-bold uppercase tracking-wider text-pink-600 border border-pink-600 px-3 py-1.5 rounded-lg hover:bg-pink-600 hover:text-white transition"
                    >
                      Consultar
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* --- BOLETÍN DE SUSCRIPCIÓN ("VOZ DE SUSCRIPCIÓN") --- */}
      <section id="suscripcion" className="bg-slate-900 text-white py-16 px-6">
        <div className="max-w-2xl mx-auto text-center space-y-6">
          <span className="bg-pink-500/20 text-pink-400 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest">
            Promoción Exclusiva
          </span>
          <h3 className="text-3xl font-bold">¡Suscríbete y obtén 15% OFF!</h3>
          <p className="text-slate-400 text-sm">
            Déjanos tu correo para recibir descuentos mensuales en tintes, retoques y tratamientos capilares.
          </p>

          <form onSubmit={handleSuscripcion} className="flex flex-col sm:flex-row gap-3 justify-center">
            <input 
              type="email" 
              placeholder="Ingresa tu correo electrónico" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="px-4 py-3 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-pink-500 w-full sm:w-80"
            />
            <button 
              type="submit" 
              className="bg-pink-600 hover:bg-pink-700 font-bold px-6 py-3 rounded-xl transition"
            >
              Suscribirme
            </button>
          </form>

          {mensajeSuscripcion && (
            <p className="text-emerald-400 text-sm font-semibold">{mensajeSuscripcion}</p>
          )}
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-slate-950 text-slate-500 py-8 text-center text-sm border-t border-slate-800">
        <p>© 2026 Studio & Styles Salon. Todos los derechos reservados.</p>
      </footer>

    </div>
  );
}
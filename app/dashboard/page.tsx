'use client';

import { useState, useEffect } from 'react';

interface Servicio {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  url_imagen: string;
  estado: boolean;
}

export default function DashboardPage() {
  const [servicios, setServicios] = useState<Servicio[]>([]);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [nuevoServicio, setNuevoServicio] = useState({
    nombre: '',
    descripcion: '',
    precio: '',
    url_imagen: ''
  });

  // Cargar servicios desde el backend
  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/servicios')
      .then((res) => res.json())
      .then((data) => setServicios(data))
      .catch((err) => console.error('Error al cargar servicios:', err));
  }, []);

  const handleCrearServicio = (e: React.FormEvent) => {
    e.preventDefault();
    const servicioCreado: Servicio = {
      id: Date.now(),
      nombre: nuevoServicio.nombre,
      descripcion: nuevoServicio.descripcion,
      precio: parseFloat(nuevoServicio.precio) || 0,
      url_imagen: nuevoServicio.url_imagen || 'https://picsum.photos/400/300',
      estado: true
    };

    setServicios([...servicios, servicioCreado]);
    setNuevoServicio({ nombre: '', descripcion: '', precio: '', url_imagen: '' });
    setMostrarModal(false);
  };

  const handleEliminar = (id: number) => {
    setServicios(servicios.filter((s) => s.id !== id));
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans flex flex-col md:flex-row">
      
      {/* --- SIDEBAR DE NAVEGACIÓN --- */}
      <aside className="w-full md:w-64 bg-zinc-950 border-r border-zinc-900 p-6 space-y-8 flex-shrink-0">
        <div>
          <a href="/" className="text-xl font-black tracking-tighter text-white">
            STUDIO <span className="text-pink-500">&</span> STYLES
          </a>
          <p className="text-xs text-zinc-500 mt-1">Panel de Administración</p>
        </div>

        <nav className="space-y-2 text-sm font-semibold">
          <a href="/dashboard" className="flex items-center gap-3 bg-pink-600/10 text-pink-500 border border-pink-500/20 px-4 py-3 rounded-xl">
            <span>✂️</span> Servicios
          </a>
          <a href="#" className="flex items-center gap-3 text-zinc-400 hover:text-white hover:bg-zinc-900 px-4 py-3 rounded-xl transition">
            <span>📧</span> Suscriptores
          </a>
          <a href="#" className="flex items-center gap-3 text-zinc-400 hover:text-white hover:bg-zinc-900 px-4 py-3 rounded-xl transition">
            <span>📊</span> Reporte de Citas
          </a>
          <a href="/" className="flex items-center gap-3 text-zinc-500 hover:text-rose-400 px-4 py-3 rounded-xl transition pt-8">
            <span>←</span> Volver a la Web
          </a>
        </nav>
      </aside>

      {/* --- CONTENIDO PRINCIPAL --- */}
      <main className="flex-1 p-6 md:p-10 space-y-8">
        
        {/* Encabezado y Botón Principal */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-900 pb-6">
          <div>
            <h1 className="text-3xl font-black uppercase tracking-tight">Gestión de Catálogo</h1>
            <p className="text-zinc-400 text-sm mt-1">Administra los precios, nombres y fotos de los servicios ofrecidos.</p>
          </div>

          <button 
            onClick={() => setMostrarModal(true)}
            className="bg-gradient-to-r from-pink-600 to-pink-500 hover:from-pink-500 hover:to-pink-400 text-white font-bold px-6 py-3 rounded-xl text-xs uppercase tracking-wider transition shadow-lg shadow-pink-600/20 flex items-center justify-center gap-2"
          >
            <span>+</span> Nuevo Servicio
          </button>
        </div>

        {/* Métrica / Tarjetas de Resumen */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-zinc-900/60 border border-zinc-800 p-5 rounded-2xl">
            <span className="text-zinc-500 text-xs font-bold uppercase">Servicios Activos</span>
            <p className="text-3xl font-black text-white mt-2">{servicios.length}</p>
          </div>
          <div className="bg-zinc-900/60 border border-zinc-800 p-5 rounded-2xl">
            <span className="text-zinc-500 text-xs font-bold uppercase">Suscriptores al Club</span>
            <p className="text-3xl font-black text-pink-500 mt-2">24</p>
          </div>
          <div className="bg-zinc-900/60 border border-zinc-800 p-5 rounded-2xl">
            <span className="text-zinc-500 text-xs font-bold uppercase">Estado Backend</span>
            <p className="text-xs font-bold text-emerald-400 mt-3 flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse"></span> Conectado a FastAPI
            </p>
          </div>
        </div>

        {/* TABLA DE SERVICIOS */}
        <div className="bg-zinc-900/40 border border-zinc-800 rounded-2xl overflow-hidden">
          <div className="px-6 py-4 border-b border-zinc-800 font-bold text-sm uppercase tracking-wider text-zinc-400">
            Lista de Servicios
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-zinc-300">
              <thead className="bg-zinc-950 text-zinc-500 text-xs uppercase border-b border-zinc-800">
                <tr>
                  <th className="p-4">Servicio</th>
                  <th className="p-4">Descripción</th>
                  <th className="p-4">Precio</th>
                  <th className="p-4">Estado</th>
                  <th className="p-4 text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/60">
                {servicios.map((s) => (
                  <tr key={s.id} className="hover:bg-zinc-900/80 transition">
                    <td className="p-4 font-bold text-white flex items-center gap-3">
                      <img src={s.url_imagen} alt={s.nombre} className="w-10 h-10 rounded-lg object-cover bg-zinc-800" />
                      {s.nombre}
                    </td>
                    <td className="p-4 text-zinc-400 max-w-xs truncate">{s.descripcion}</td>
                    <td className="p-4 font-black text-pink-400">S/ {s.precio.toFixed(2)}</td>
                    <td className="p-4">
                      <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold px-2.5 py-1 rounded-full">
                        Disponible
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <button 
                        onClick={() => handleEliminar(s.id)}
                        className="text-rose-500 hover:text-rose-400 text-xs font-bold uppercase tracking-wider bg-rose-500/10 border border-rose-500/20 px-3 py-1.5 rounded-lg transition"
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </main>

      {/* --- MODAL PARA CREAR NUEVO SERVICIO --- */}
      {mostrarModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 md:p-8 max-w-md w-full space-y-6">
            <div className="flex justify-between items-center border-b border-zinc-800 pb-4">
              <h3 className="text-xl font-bold uppercase tracking-wide">Agregar Servicio</h3>
              <button onClick={() => setMostrarModal(false)} className="text-zinc-500 hover:text-white">✕</button>
            </div>

            <form onSubmit={handleCrearServicio} className="space-y-4">
              <div>
                <label className="text-xs text-zinc-400 font-bold uppercase block mb-1">Nombre</label>
                <input 
                  type="text" 
                  required
                  placeholder="Ej: Alisado Japonés"
                  value={nuevoServicio.nombre}
                  onChange={(e) => setNuevoServicio({...nuevoServicio, nombre: e.target.value})}
                  className="w-full bg-black border border-zinc-800 rounded-xl p-3 text-sm focus:border-pink-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs text-zinc-400 font-bold uppercase block mb-1">Precio (S/)</label>
                <input 
                  type="number" 
                  step="0.01"
                  required
                  placeholder="120.00"
                  value={nuevoServicio.precio}
                  onChange={(e) => setNuevoServicio({...nuevoServicio, precio: e.target.value})}
                  className="w-full bg-black border border-zinc-800 rounded-xl p-3 text-sm focus:border-pink-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs text-zinc-400 font-bold uppercase block mb-1">Descripción</label>
                <textarea 
                  rows={3}
                  required
                  placeholder="Detalles del tratamiento..."
                  value={nuevoServicio.descripcion}
                  onChange={(e) => setNuevoServicio({...nuevoServicio, descripcion: e.target.value})}
                  className="w-full bg-black border border-zinc-800 rounded-xl p-3 text-sm focus:border-pink-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs text-zinc-400 font-bold uppercase block mb-1">URL Imagen (Opcional)</label>
                <input 
                  type="url" 
                  placeholder="https://..."
                  value={nuevoServicio.url_imagen}
                  onChange={(e) => setNuevoServicio({...nuevoServicio, url_imagen: e.target.value})}
                  className="w-full bg-black border border-zinc-800 rounded-xl p-3 text-sm focus:border-pink-500 focus:outline-none"
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button 
                  type="button" 
                  onClick={() => setMostrarModal(false)}
                  className="w-1/2 bg-zinc-800 text-zinc-300 font-bold py-3 rounded-xl text-xs uppercase"
                >
                  Cancelar
                </button>
                <button 
                  type="submit" 
                  className="w-1/2 bg-pink-600 hover:bg-pink-500 text-white font-bold py-3 rounded-xl text-xs uppercase shadow-lg shadow-pink-600/30"
                >
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, PiggyBank,BookOpen,TrendingUp  } from 'lucide-react';
export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  const closeMenu = () => setMenuOpen(false);
  return (
<div className={`min-h-screen bg-gradient-to-b from-green-50 to-white ${menuOpen ? 'overflow-hidden' : ''}`}>
  {/* Fondo difuminado cuando el menú está abierto */}
  {menuOpen && (
    <div className="fixed inset-0 bg-white bg-opacity-70 backdrop-blur-sm z-10"></div>
  )}

  <header className="bg-white bg-opacity-50 backdrop-blur-lg fixed top-0 left-0 w-full z-20 shadow-sm">
    <div className="container mx-auto px-4 py-4 flex justify-between items-center">
      <div className="flex items-center space-x-2">
        <PiggyBank className="h-8 w-8 text-green-600" />
        <h1 className="text-2xl font-bold text-green-700">AhorraT</h1>
      </div>

      {/* Botón hamburguesa */}
      <div className="lg:hidden z-30">
        <button
          className="text-green-800 focus:outline-none"
          onClick={() => setMenuOpen(true)}
        >
          {/* Icono menú (hamburguesa) siempre visible */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      {/* Menú de navegación para pantallas grandes */}
      <nav className="hidden lg:block">
        <ul className="flex space-x-6">
          <li>
            <Link href="/" className="text-green-800 hover:text-green-600 font-medium">
              Inicio
            </Link>
          </li>
          <li>
            <Link href="/aprender" className="text-green-800 hover:text-green-600 font-medium">
              Aprender
            </Link>
          </li>
          <li>
            <Link href="/cuenta" className="text-green-800 hover:text-green-600 font-medium">
              Mi Cuenta
            </Link>
          </li>
          <li>
            <Link href="/inversiones" className="text-green-800 hover:text-green-600 font-medium">
              Inversiones
            </Link>
          </li>
          <li>
            <Link href="/consejos" className="text-green-800 hover:text-green-600 font-medium">
              Consejos
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  </header>

  {/* Menú móvil centrado (solo aparece cuando menuOpen === true) */}
  {menuOpen && (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg p-8 w-11/12 max-w-sm text-center space-y-4 relative">
        {/* Botón de cerrar dentro de la card */}
        <button
          className="absolute top-4 right-4 text-green-600 text-2xl font-bold"
          onClick={() => setMenuOpen(false)}
        >
          &times;
        </button>
        <Link href="/" onClick={() => setMenuOpen(false)} className="block text-green-800 hover:text-green-600 font-semibold text-lg">Inicio</Link>
        <Link href="/aprender" onClick={() => setMenuOpen(false)} className="block text-green-800 hover:text-green-600 font-semibold text-lg">Aprender</Link>
        <Link href="/cuenta" onClick={() => setMenuOpen(false)} className="block text-green-800 hover:text-green-600 font-semibold text-lg">Mi Cuenta</Link>
        <Link href="/inversiones" onClick={() => setMenuOpen(false)} className="block text-green-800 hover:text-green-600 font-semibold text-lg">Inversiones</Link>
        <Link href="/consejos" onClick={() => setMenuOpen(false)} className="block text-green-800 hover:text-green-600 font-semibold text-lg">Consejos</Link>
      </div>
    </div>
  )}
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-5xl flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h2 className="text-4xl md:text-5xl font-bold text-green-800 mb-6">
              Aprende a manejar tu dinero de forma inteligente
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Educación financiera práctica y herramientas para ayudarte a ahorrar, invertir y hacer crecer tu
              patrimonio.
            </p>
            <div className="flex space-x-4">
              <Link
                href="/aprender"
                className="px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition flex items-center"
              >
                Comenzar a aprender <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                href="/cuenta"
                className="px-6 py-3 border border-green-600 text-green-600 rounded-lg font-medium hover:bg-green-50 transition"
              >
                Mi cuenta
              </Link>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <img
              src="/principal.jpg?height=400&width=400"
              alt="Ilustración de finanzas personales"
              className="max-w-full h-auto rounded-lg shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Características */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-green-800 mb-12">¿Qué ofrecemos?</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-green-50 p-8 rounded-xl shadow-sm">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <BookOpen className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-green-800 mb-4">Educación Financiera</h3>
              <p className="text-gray-600">
                Aprende conceptos financieros fundamentales, estrategias de ahorro y cómo hacer que tu dinero trabaje
                para ti.
              </p>
            </div>

            <div className="bg-green-50 p-8 rounded-xl shadow-sm">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <PiggyBank className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-green-800 mb-4">Gestión de Ahorros</h3>
              <p className="text-gray-600">
                Herramientas para registrar tus ingresos y gastos, establecer metas de ahorro y hacer seguimiento de tu
                progreso.
              </p>
            </div>

            <div className="bg-green-50 p-8 rounded-xl shadow-sm">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <TrendingUp className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-green-800 mb-4">Asesoría Personalizada</h3>
              <p className="text-gray-600">
                Recibe consejos adaptados a tus hábitos financieros y aprende a optimizar la gestión de tu dinero.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonios */}
      <section className="py-16 bg-green-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-green-800 mb-12">Lo que dicen nuestros usuarios</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <p className="text-gray-600 mb-6">
                "Gracias a AhorrarT he aprendido a organizar mis finanzas y he logrado ahorrar para mi primer auto. Los
                consejos son muy prácticos y fáciles de aplicar."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-green-200 rounded-full mr-4"></div>
                <div>
                  <h4 className="font-bold text-green-800">María González</h4>
                  <p className="text-gray-500 text-sm">Estudiante universitaria</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm">
              <p className="text-gray-600 mb-6">
                "Nunca entendí bien cómo manejar mi dinero hasta que encontré esta plataforma. Ahora tengo un fondo de
                emergencia y estoy invirtiendo para mi futuro."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-green-200 rounded-full mr-4"></div>
                <div>
                  <h4 className="font-bold text-green-800">Carlos Rodríguez</h4>
                  <p className="text-gray-500 text-sm">Profesional independiente</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-green-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Comienza tu camino hacia la libertad financiera</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Regístrate hoy y da el primer paso para transformar tu relación con el dinero.
          </p>
          <Link
            href="/cuenta"
            className="px-8 py-4 bg-white text-green-700 rounded-lg font-bold hover:bg-green-50 transition inline-flex items-center"
          >
            Crear mi cuenta <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-green-900 text-green-100 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <PiggyBank className="h-6 w-6" />
                <h3 className="text-xl font-bold">AhorrarT</h3>
              </div>
              <p className="text-green-300">Educación financiera para todos.</p>
            </div>

            <div>
              <h4 className="font-bold mb-4">Recursos</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/blog" className="text-green-300 hover:text-white">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/calculadoras" className="text-green-300 hover:text-white">
                    Calculadoras
                  </Link>
                </li>
                <li>
                  <Link href="/glosario" className="text-green-300 hover:text-white">
                    Glosario financiero
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4">Compañía</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/nosotros" className="text-green-300 hover:text-white">
                    Sobre nosotros
                  </Link>
                </li>
                <li>
                  <Link href="/contacto" className="text-green-300 hover:text-white">
                    Contacto
                  </Link>
                </li>
                <li>
                  <Link href="/privacidad" className="text-green-300 hover:text-white">
                    Política de privacidad
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4">Suscríbete</h4>
              <p className="text-green-300 mb-4">Recibe consejos financieros en tu correo</p>
              <div className="flex">
                <input type="email" placeholder="Tu email" className="px-4 py-2 rounded-l-lg w-full" />
                <button className="bg-green-600 px-4 py-2 rounded-r-lg hover:bg-green-500 transition">
                  <ArrowRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>

          <div className="border-t border-green-800 mt-12 pt-6 text-center text-green-400">
            <p>&copy; {new Date().getFullYear()} AhorrarT. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

import Link from "next/link"
import { ArrowLeft, PiggyBank, TrendingUp, DollarSign, BarChart, ArrowRight } from "lucide-react"
import { Card } from "@/components/ui/card"

export default function AprenderPage() {
  // Datos para los cursos
  const courses = [
    {
      id: 1,
      title: "Fundamentos de Finanzas Personales",
      description: "Aprende los conceptos básicos para gestionar tu dinero de manera efectiva.",
      icon: <DollarSign className="h-8 w-8 text-green-600" />,
      level: "Principiante",
      lessons: 8,
      duration: "2 horas",
    },
    {
      id: 2,
      title: "Estrategias de Ahorro",
      description: "Descubre técnicas prácticas para maximizar tus ahorros y crear un fondo de emergencia.",
      icon: <PiggyBank className="h-8 w-8 text-green-600" />,
      level: "Principiante",
      lessons: 6,
      duration: "1.5 horas",
    },
    {
      id: 3,
      title: "Presupuesto Inteligente",
      description: "Aprende a crear y mantener un presupuesto que funcione para tus necesidades.",
      icon: <BarChart className="h-8 w-8 text-green-600" />,
      level: "Intermedio",
      lessons: 7,
      duration: "2 horas",
    },
    {
      id: 4,
      title: "Introducción a las Inversiones",
      description: "Conoce los fundamentos de la inversión y cómo hacer crecer tu patrimonio a largo plazo.",
      icon: <TrendingUp className="h-8 w-8 text-green-600" />,
      level: "Intermedio",
      lessons: 10,
      duration: "3 horas",
    },
  ]

  // Datos para los artículos
  const articles = [
    {
      id: 1,
      title: "10 hábitos financieros que cambiarán tu vida",
      excerpt:
        "Descubre los hábitos diarios que pueden transformar tu situación financiera y ayudarte a alcanzar tus metas.",
      date: "10 de abril, 2023",
      readTime: "5 min",
    },
    {
      id: 2,
      title: "Cómo crear un fondo de emergencia en 6 meses",
      excerpt:
        "Guía paso a paso para construir un fondo de emergencia sólido que te proteja de imprevistos financieros.",
      date: "25 de marzo, 2023",
      readTime: "7 min",
    },
    {
      id: 3,
      title: "La regla 50/30/20 para organizar tus finanzas",
      excerpt: "Aprende a distribuir tus ingresos de manera efectiva utilizando esta sencilla regla presupuestaria.",
      date: "15 de marzo, 2023",
      readTime: "4 min",
    },
  ]

  return (
    <div className="min-h-screen bg-green-50">
      {/* Navegación */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <Link href="/" className="flex items-center space-x-2 text-green-700 hover:text-green-600 transition">
            <ArrowLeft className="h-5 w-5" />
            <span>Volver al inicio</span>
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-green-800 mb-2">Centro de Aprendizaje</h1>
        <p className="text-gray-600 mb-8">
          Recursos educativos para mejorar tus conocimientos financieros y tomar mejores decisiones con tu dinero.
        </p>

        {/* Cursos */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-green-800">Cursos Financieros</h2>
            <Link href="/aprender/cursos" className="text-green-600 hover:text-green-700 flex items-center">
              Ver todos <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {courses.map((course) => (
              <Card key={course.id} className="overflow-hidden hover:shadow-md transition">
                <div className="p-6">
                  <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                    {course.icon}
                  </div>
                  <h3 className="text-xl font-bold text-green-800 mb-2">{course.title}</h3>
                  <p className="text-gray-600 mb-4">{course.description}</p>
                  <div className="flex justify-between text-sm text-gray-500 mb-4">
                    <span>{course.level}</span>
                    <span>{course.lessons} lecciones</span>
                    <span>{course.duration}</span>
                  </div>
                  <Link
                    href={`/aprender/cursos/${course.id}`}
                    className="block w-full text-center py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                  >
                    Comenzar curso
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Artículos */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-green-800">Artículos Recientes</h2>
            <Link href="/aprender/articulos" className="text-green-600 hover:text-green-700 flex items-center">
              Ver todos <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {articles.map((article) => (
              <Card key={article.id} className="overflow-hidden hover:shadow-md transition">
                <div className="h-40 bg-green-200"></div>
                <div className="p-6">
                  <div className="flex justify-between text-sm text-gray-500 mb-2">
                    <span>{article.date}</span>
                    <span>{article.readTime} de lectura</span>
                  </div>
                  <h3 className="text-xl font-bold text-green-800 mb-2">{article.title}</h3>
                  <p className="text-gray-600 mb-4">{article.excerpt}</p>
                  <Link
                    href={`/aprender/articulos/${article.id}`}
                    className="text-green-600 hover:text-green-700 flex items-center"
                  >
                    Leer más <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Recursos */}
        <section>
          <h2 className="text-2xl font-bold text-green-800 mb-8">Herramientas y Recursos</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-6 bg-green-600 text-white">
              <h3 className="text-xl font-bold mb-2">Calculadoras Financieras</h3>
              <p className="mb-4">Herramientas para calcular ahorros, préstamos, inversiones y más.</p>
              <Link
                href="/herramientas/calculadoras"
                className="inline-block px-4 py-2 bg-white text-green-600 rounded-lg hover:bg-green-50 transition"
              >
                Usar calculadoras
              </Link>
            </Card>

            <Card className="p-6 bg-green-700 text-white">
              <h3 className="text-xl font-bold mb-2">Glosario Financiero</h3>
              <p className="mb-4">Diccionario de términos financieros explicados de manera sencilla.</p>
              <Link
                href="/herramientas/glosario"
                className="inline-block px-4 py-2 bg-white text-green-700 rounded-lg hover:bg-green-50 transition"
              >
                Consultar glosario
              </Link>
            </Card>
          </div>
        </section>
      </div>
    </div>
  )
}

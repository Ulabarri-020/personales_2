"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Lightbulb, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Datos para los consejos financieros
const financialTips = [
  {
    id: 1,
    category: "ahorro",
    title: "La regla 50/30/20",
    description: "Destina el 50% de tus ingresos a necesidades básicas, 30% a deseos y 20% a ahorro e inversión.",
    icon: <Lightbulb className="h-6 w-6 text-yellow-500" />,
  },
  {
    id: 2,
    category: "ahorro",
    title: "Automatiza tus ahorros",
    description: "Configura transferencias automáticas a tu cuenta de ahorros el día que recibes tu sueldo.",
    icon: <Lightbulb className="h-6 w-6 text-yellow-500" />,
  },
  {
    id: 3,
    category: "ahorro",
    title: "Reto de ahorro",
    description:
      "Ahorra una cantidad pequeña cada día e incrementa gradualmente. Por ejemplo, 1 peso el día 1, 2 pesos el día 2, etc.",
    icon: <Lightbulb className="h-6 w-6 text-yellow-500" />,
  },
  {
    id: 4,
    category: "presupuesto",
    title: "Revisa tus gastos semanalmente",
    description: "Dedica 15 minutos cada semana para revisar tus gastos y ajustar tu presupuesto si es necesario.",
    icon: <Lightbulb className="h-6 w-6 text-yellow-500" />,
  },
  {
    id: 5,
    category: "presupuesto",
    title: "Usa la regla de las 24 horas",
    description: "Antes de hacer una compra no planificada, espera 24 horas para evaluar si realmente la necesitas.",
    icon: <Lightbulb className="h-6 w-6 text-yellow-500" />,
  },
  {
    id: 6,
    category: "presupuesto",
    title: "Método del sobre",
    description:
      "Divide tu dinero en sobres etiquetados para diferentes categorías de gastos para evitar gastar de más.",
    icon: <Lightbulb className="h-6 w-6 text-yellow-500" />,
  },
  {
    id: 7,
    category: "deudas",
    title: "Método de la bola de nieve",
    description:
      "Paga primero las deudas más pequeñas para ganar impulso y motivación en tu camino hacia la libertad financiera.",
    icon: <Lightbulb className="h-6 w-6 text-yellow-500" />,
  },
  {
    id: 8,
    category: "deudas",
    title: "Método de la avalancha",
    description: "Paga primero las deudas con las tasas de interés más altas para minimizar el interés total pagado.",
    icon: <Lightbulb className="h-6 w-6 text-yellow-500" />,
  },
  {
    id: 9,
    category: "inversión",
    title: "Diversifica tus inversiones",
    description: "No pongas todos tus huevos en la misma canasta. Diversifica tus inversiones para reducir el riesgo.",
    icon: <Lightbulb className="h-6 w-6 text-yellow-500" />,
  },
  {
    id: 10,
    category: "inversión",
    title: "Invierte regularmente",
    description: "Establece un plan de inversión regular, independientemente de las condiciones del mercado.",
    icon: <Lightbulb className="h-6 w-6 text-yellow-500" />,
  },
  {
    id: 11,
    category: "inversión",
    title: "Reinvierte los dividendos",
    description: "Reinvierte los dividendos y ganancias para aprovechar el poder del interés compuesto.",
    icon: <Lightbulb className="h-6 w-6 text-yellow-500" />,
  },
  {
    id: 12,
    category: "general",
    title: "Educación financiera continua",
    description:
      "Dedica tiempo regularmente a aprender sobre finanzas personales a través de libros, podcasts y cursos.",
    icon: <Lightbulb className="h-6 w-6 text-yellow-500" />,
  },
]

export default function ConsejosPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeCategory, setActiveCategory] = useState("todos")

  // Filtrar consejos basados en la búsqueda y categoría
  const filteredTips = financialTips.filter((tip) => {
    const matchesSearch =
      tip.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tip.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = activeCategory === "todos" || tip.category === activeCategory

    return matchesSearch && matchesCategory
  })

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
        <h1 className="text-3xl font-bold text-green-800 mb-2">Consejos Financieros</h1>
        <p className="text-gray-600 mb-8">
          Descubre consejos prácticos para mejorar tu salud financiera y alcanzar tus metas.
        </p>

        {/* Buscador */}
        <div className="relative mb-8">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            type="text"
            placeholder="Buscar consejos..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Categorías */}
        <Tabs defaultValue="todos" className="mb-8" onValueChange={setActiveCategory}>
          <TabsList className="grid grid-cols-3 md:grid-cols-6">
            <TabsTrigger value="todos">Todos</TabsTrigger>
            <TabsTrigger value="ahorro">Ahorro</TabsTrigger>
            <TabsTrigger value="presupuesto">Presupuesto</TabsTrigger>
            <TabsTrigger value="deudas">Deudas</TabsTrigger>
            <TabsTrigger value="inversión">Inversión</TabsTrigger>
            <TabsTrigger value="general">General</TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Consejos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTips.length > 0 ? (
            filteredTips.map((tip) => (
              <Card key={tip.id} className="overflow-hidden hover:shadow-md transition">
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="bg-yellow-100 w-10 h-10 rounded-full flex items-center justify-center mr-3">
                      {tip.icon}
                    </div>
                    <span className="text-sm font-medium px-3 py-1 bg-green-100 text-green-800 rounded-full capitalize">
                      {tip.category}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-green-800 mb-2">{tip.title}</h3>
                  <p className="text-gray-600">{tip.description}</p>
                </div>
              </Card>
            ))
          ) : (
            <div className="col-span-3 text-center py-12">
              <p className="text-gray-500 mb-4">No se encontraron consejos que coincidan con tu búsqueda.</p>
              <Button
                onClick={() => {
                  setSearchTerm("")
                  setActiveCategory("todos")
                }}
              >
                Mostrar todos los consejos
              </Button>
            </div>
          )}
        </div>

        {/* Consejo personalizado */}
        <Card className="mt-12 p-8 bg-green-700 text-white">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-2/3 mb-6 md:mb-0 md:pr-8">
              <h2 className="text-2xl font-bold mb-4">¿Necesitas un consejo personalizado?</h2>
              <p className="mb-6">
                Responde algunas preguntas sobre tu situación financiera y te daremos recomendaciones adaptadas a tus
                necesidades específicas.
              </p>
              <Link
                href="/consejos/personalizado"
                className="inline-block px-6 py-3 bg-white text-green-700 rounded-lg font-medium hover:bg-green-50 transition"
              >
                Obtener consejo personalizado
              </Link>
            </div>
            <div className="md:w-1/3 flex justify-center">
              <div className="w-40 h-40 bg-green-600 rounded-full flex items-center justify-center">
                <Lightbulb className="h-20 w-20 text-green-100" />
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}

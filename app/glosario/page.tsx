import Link from "next/link"
import { Card } from "@/components/ui/card"
import { ArrowLeft, BookOpen } from "lucide-react"

const terms = [
  {
    term: "Activo",
    definition: "Bienes y derechos que posee una persona o empresa y que tienen un valor económico.",
  },
  {
    term: "Pasivo",
    definition: "Obligaciones o deudas que una persona o empresa debe pagar.",
  },
  {
    term: "Presupuesto",
    definition: "Plan financiero que ayuda a controlar ingresos y gastos en un periodo determinado.",
  },
  {
    term: "Interés",
    definition: "Costo del dinero prestado o rendimiento obtenido por una inversión.",
  },
  {
    term: "Ahorro",
    definition: "Parte del ingreso que no se consume y se reserva para necesidades futuras.",
  },
  {
    term: "Inversión",
    definition: "Uso de dinero para obtener ganancias o beneficios a mediano o largo plazo.",
  },
]

export default function GlosarioPage() {
  return (
    <div className="min-h-screen bg-green-50">
      {/* Header con navegación */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center space-x-3">
          <Link
            href="/"
            className="flex items-center text-[#16A24A] hover:text-green-700 transition"
          >
            <ArrowLeft className="h-5 w-5" />
            <span className="ml-2 font-semibold">Volver al inicio</span>
          </Link>
          <BookOpen className="text-[#16A24A] h-6 w-6" />
          <h1 className="text-xl font-bold text-[#16A24A]">Glosario Financiero</h1>
        </div>
      </header>

      {/* Contenido */}
      <main className="container mx-auto px-4 py-12">
        <p className="text-gray-700 mb-8 max-w-xl">
          Aquí encontrarás los términos financieros más importantes para que aprendas a manejar tus finanzas personales y lleves un control eficiente de tus ingresos, gastos, ahorros e inversiones.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {terms.map(({ term, definition }) => (
            <Card
              key={term}
              className="border-l-4 border-[#16A24A] p-6 hover:shadow-lg transition cursor-default"
            >
              <h2 className="text-lg font-bold text-[#16A24A] mb-2">{term}</h2>
              <p className="text-gray-700">{definition}</p>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}

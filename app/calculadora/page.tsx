import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Calculator, ArrowLeft } from "lucide-react"

const calculators = [
  {
    name: "Calculadora de Ahorros",
    description: "Calcula cuánto puedes ahorrar con aportes periódicos y tasa de interés.",
    href: "/calculadora/ahorros",
  },
  {
    name: "Calculadora de Préstamos",
    description: "Determina el monto de cuotas y plazo para pagar un préstamo.",
    href: "/calculadora/prestamos", 
  },
  {
    name: "Calculadora de Inversiones",
    description: "Estima la rentabilidad de tus inversiones a mediano y largo plazo.",
    href: "/calculadora/inversiones", 
  },
  {
    name: "Calculadora de Presupuesto",
    description: "Ayuda a planificar tus ingresos y gastos mensuales para mantener finanzas saludables.",
    href: "/calculadora/presupuestos", 
  },
]

export default function CalculadorasPage() {
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
          <Calculator className="text-[#16A24A] h-6 w-6" />
          <h1 className="text-xl font-bold text-[#16A24A]">Calculadoras Financieras</h1>
        </div>
      </header>

      {/* Contenido */}
      <main className="container mx-auto px-4 py-12">
        <p className="text-gray-700 mb-8 max-w-xl">
          Herramientas para calcular ahorros, préstamos, inversiones y más. Selecciona una calculadora para comenzar a planificar tus finanzas personales.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {calculators.map(({ name, description, href }) => (
            <Card
              key={name}
              className="border-l-4 border-[#16A24A] p-6 hover:shadow-lg transition cursor-pointer"
            >
              <Link href={href} className="block">
                <h2 className="text-lg font-bold text-[#16A24A] mb-2">{name}</h2>
                <p className="text-gray-700">{description}</p>
              </Link>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}

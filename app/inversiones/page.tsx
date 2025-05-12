"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, TrendingUp, PiggyBank, Info, ArrowRight, Calendar } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts"

// Tipos para los fondos de inversión
type FundType = {
  id: string
  name: string
  risk: "bajo" | "moderado" | "alto"
  annualReturn: number
  description: string
  minInvestment: number
  recommendedTerm: string
  historicalData: { month: string; return: number }[]
}

export default function InversionesPage() {
  // Estado para la simulación
  const [initialInvestment, setInitialInvestment] = useState<number>(45000000)
  const [monthlyContribution, setMonthlyContribution] = useState<number>(2250000)
  const [years, setYears] = useState<number>(5)
  const [selectedFundId, setSelectedFundId] = useState<string>("balanced")
  const [simulationResults, setSimulationResults] = useState<any[]>([])
  const [totalReturn, setTotalReturn] = useState<number>(0)
  const [finalAmount, setFinalAmount] = useState<number>(0)

  // Datos de fondos de inversión
  const investmentFunds: FundType[] = [
    {
      id: "conservative",
      name: "Fondo Conservador",
      risk: "bajo",
      annualReturn: 4.5,
      description:
        "Fondo de bajo riesgo ideal para inversores conservadores. Invierte principalmente en bonos gubernamentales y corporativos de alta calidad.",
      minInvestment: 22500000,
      recommendedTerm: "1-3 años",
      historicalData: [
        { month: "Ene", return: 0.3 },
        { month: "Feb", return: 0.4 },
        { month: "Mar", return: 0.2 },
        { month: "Abr", return: 0.5 },
        { month: "May", return: 0.3 },
        { month: "Jun", return: 0.4 },
        { month: "Jul", return: 0.3 },
        { month: "Ago", return: 0.4 },
        { month: "Sep", return: 0.3 },
        { month: "Oct", return: 0.5 },
        { month: "Nov", return: 0.4 },
        { month: "Dic", return: 0.5 },
      ],
    },
    {
      id: "balanced",
      name: "Fondo Equilibrado",
      risk: "moderado",
      annualReturn: 7.2,
      description:
        "Fondo de riesgo moderado con una mezcla equilibrada de renta fija y variable. Ideal para inversores con horizonte temporal medio.",
      minInvestment: 45000000,
      recommendedTerm: "3-5 años",
      historicalData: [
        { month: "Ene", return: 0.5 },
        { month: "Feb", return: 0.7 },
        { month: "Mar", return: -0.2 },
        { month: "Abr", return: 0.8 },
        { month: "May", return: 0.6 },
        { month: "Jun", return: 0.5 },
        { month: "Jul", return: 0.7 },
        { month: "Ago", return: 0.6 },
        { month: "Sep", return: -0.1 },
        { month: "Oct", return: 0.8 },
        { month: "Nov", return: 0.7 },
        { month: "Dic", return: 0.6 },
      ],
    },
    {
      id: "growth",
      name: "Fondo Crecimiento",
      risk: "alto",
      annualReturn: 10.8,
      description:
        "Fondo de alto riesgo enfocado en el crecimiento a largo plazo. Invierte principalmente en acciones de empresas con alto potencial de crecimiento.",
      minInvestment: 67500000,
      recommendedTerm: "5+ años",
      historicalData: [
        { month: "Ene", return: 1.2 },
        { month: "Feb", return: 1.5 },
        { month: "Mar", return: -0.8 },
        { month: "Abr", return: 1.3 },
        { month: "May", return: 0.9 },
        { month: "Jun", return: -0.5 },
        { month: "Jul", return: 1.4 },
        { month: "Ago", return: 1.1 },
        { month: "Sep", return: -0.7 },
        { month: "Oct", return: 1.6 },
        { month: "Nov", return: 1.2 },
        { month: "Dic", return: 1.0 },
      ],
    },
  ]

  // Encontrar el fondo seleccionado
  const selectedFund = investmentFunds.find((fund) => fund.id === selectedFundId) || investmentFunds[0]

  // Calcular la simulación cuando cambien los parámetros
  useEffect(() => {
    calculateInvestmentGrowth()
  }, [initialInvestment, monthlyContribution, years, selectedFundId])

  // Función para calcular el crecimiento de la inversión
  const calculateInvestmentGrowth = () => {
    const monthlyRate = selectedFund.annualReturn / 100 / 12
    const totalMonths = years * 12
    const results = []

    let currentAmount = initialInvestment
    let totalContributions = initialInvestment

    for (let month = 1; month <= totalMonths; month++) {
      // Añadir contribución mensual
      currentAmount += monthlyContribution
      totalContributions += monthlyContribution

      // Aplicar rendimiento mensual
      currentAmount *= 1 + monthlyRate

      // Añadir variación aleatoria para simular fluctuaciones del mercado
      const randomVariation = 1 + (Math.random() * 0.01 - 0.005) // ±0.5%
      currentAmount *= randomVariation

      // Añadir punto de datos cada 3 meses para no sobrecargar la gráfica
      if (month % 3 === 0 || month === totalMonths) {
        results.push({
          month: month,
          balance: Math.round(currentAmount),
          contributions: Math.round(totalContributions),
          earnings: Math.round(currentAmount - totalContributions),
        })
      }
    }

    setSimulationResults(results)
    setTotalReturn(Math.round((currentAmount / totalContributions - 1) * 100))
    setFinalAmount(Math.round(currentAmount))
  }

  // Formatear moneda
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

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
        <h1 className="text-3xl font-bold text-green-800 mb-2">Simulador de Fondos de Inversión</h1>
        <p className="text-gray-600 mb-8">
          Explora diferentes fondos de inversión y simula cómo crecería tu dinero a lo largo del tiempo.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Panel izquierdo - Fondos disponibles */}
          <div className="lg:col-span-1">
            <Card className="p-6 mb-6">
              <h2 className="text-xl font-bold text-green-800 mb-4 flex items-center">
                <TrendingUp className="mr-2 h-5 w-5 text-green-600" />
                Fondos Disponibles
              </h2>

              <div className="space-y-4">
                {investmentFunds.map((fund) => (
                  <div
                    key={fund.id}
                    className={`p-4 rounded-lg border cursor-pointer transition ${
                      selectedFundId === fund.id
                        ? "border-green-500 bg-green-50 shadow-sm"
                        : "border-gray-200 hover:border-green-300"
                    }`}
                    onClick={() => setSelectedFundId(fund.id)}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-bold text-green-800">{fund.name}</h3>
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${
                          fund.risk === "bajo"
                            ? "bg-blue-100 text-blue-800"
                            : fund.risk === "moderado"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                        }`}
                      >
                        Riesgo {fund.risk}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{fund.description}</p>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <span className="text-gray-500">Rendimiento anual:</span>
                        <p className="font-medium text-green-700">{fund.annualReturn}%</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Inversión mínima:</span>
                        <p className="font-medium">{formatCurrency(fund.minInvestment)}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Plazo recomendado:</span>
                        <p className="font-medium">{fund.recommendedTerm}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-6 bg-green-700 text-white">
              <div className="flex items-center mb-4">
                <Info className="h-5 w-5 mr-2" />
                <h3 className="font-bold">Información importante</h3>
              </div>
              <p className="text-sm mb-4">
                Los rendimientos pasados no garantizan resultados futuros. Esta simulación es solo para fines
                educativos.
              </p>
              <p className="text-sm">
                Antes de invertir, considera consultar con un asesor financiero para evaluar si estos fondos son
                adecuados para tus objetivos financieros y tolerancia al riesgo.
              </p>
            </Card>
          </div>

          {/* Panel derecho - Simulador y gráficas */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="simulator">
              <TabsList className="grid grid-cols-2 mb-6">
                <TabsTrigger value="simulator">Simulador</TabsTrigger>
                <TabsTrigger value="historical">Rendimiento Histórico</TabsTrigger>
              </TabsList>

              <TabsContent value="simulator">
                <Card className="p-6 mb-6">
                  <h2 className="text-xl font-bold text-green-800 mb-4 flex items-center">
                    <PiggyBank className="mr-2 h-5 w-5 text-green-600" />
                    Simulador de Inversión
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="initialInvestment">Inversión inicial ($)</Label>
                        <Input
                          id="initialInvestment"
                          type="number"
                          value={initialInvestment}
                          onChange={(e) => setInitialInvestment(Number(e.target.value))}
                          min={selectedFund.minInvestment}
                        />
                        {initialInvestment < selectedFund.minInvestment && (
                          <p className="text-xs text-red-500">
                            La inversión mínima es de {formatCurrency(selectedFund.minInvestment)}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="monthlyContribution">Aportación mensual ($)</Label>
                        <Input
                          id="monthlyContribution"
                          type="number"
                          value={monthlyContribution}
                          onChange={(e) => setMonthlyContribution(Number(e.target.value))}
                          min={0}
                        />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <Label htmlFor="years">Plazo de inversión (años)</Label>
                          <span>{years} años</span>
                        </div>
                        <Slider
                          id="years"
                          min={1}
                          max={30}
                          step={1}
                          value={[years]}
                          onValueChange={(value) => setYears(value[0])}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="fund">Fondo seleccionado</Label>
                        <Select value={selectedFundId} onValueChange={setSelectedFundId}>
                          <SelectTrigger id="fund">
                            <SelectValue placeholder="Selecciona un fondo" />
                          </SelectTrigger>
                          <SelectContent>
                            {investmentFunds.map((fund) => (
                              <SelectItem key={fund.id} value={fund.id}>
                                {fund.name} ({fund.annualReturn}%)
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  <div className="bg-green-50 p-4 rounded-lg mb-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <p className="text-sm text-gray-500">Inversión total</p>
                        <p className="text-xl font-bold text-green-800">
                          {formatCurrency(initialInvestment + monthlyContribution * years * 12)}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Valor final estimado</p>
                        <p className="text-xl font-bold text-green-800">{formatCurrency(finalAmount)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Rendimiento total</p>
                        <p className="text-xl font-bold text-green-800">{totalReturn}%</p>
                      </div>
                    </div>
                  </div>

                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart
                        data={simulationResults}
                        margin={{
                          top: 10,
                          right: 30,
                          left: 0,
                          bottom: 0,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis
                          dataKey="month"
                          label={{ value: "Meses", position: "insideBottomRight", offset: -10 }}
                          tickFormatter={(value) => `${value}`}
                        />
                        <YAxis tickFormatter={(value) => `${value.toLocaleString()}$`} width={80} />
                        <Tooltip
                          formatter={(value) => [`${value.toLocaleString()}$`, undefined]}
                          labelFormatter={(value) => `Mes ${value}`}
                        />
                        <Legend />
                        <Area
                          type="monotone"
                          dataKey="contributions"
                          stackId="1"
                          stroke="#82ca9d"
                          fill="#82ca9d"
                          name="Aportaciones"
                        />
                        <Area
                          type="monotone"
                          dataKey="earnings"
                          stackId="1"
                          stroke="#8884d8"
                          fill="#8884d8"
                          name="Ganancias"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </Card>

                <div className="flex justify-between items-center">
                  <Button variant="outline" onClick={() => window.print()}>
                    Imprimir simulación
                  </Button>
                  <Link href="/cuenta">
                    <Button className="flex items-center">
                      Ir a mi cuenta <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </TabsContent>

              <TabsContent value="historical">
                <Card className="p-6 mb-6">
                  <h2 className="text-xl font-bold text-green-800 mb-4 flex items-center">
                    <Calendar className="mr-2 h-5 w-5 text-green-600" />
                    Rendimiento Histórico Mensual
                  </h2>

                  <div className="mb-6">
                    <Select value={selectedFundId} onValueChange={setSelectedFundId}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona un fondo" />
                      </SelectTrigger>
                      <SelectContent>
                        {investmentFunds.map((fund) => (
                          <SelectItem key={fund.id} value={fund.id}>
                            {fund.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={selectedFund.historicalData}
                        margin={{
                          top: 10,
                          right: 30,
                          left: 0,
                          bottom: 0,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis tickFormatter={(value) => `${value}%`} domain={[-1, 2]} />
                        <Tooltip formatter={(value) => [`${value}%`, "Rendimiento"]} />
                        <Legend />
                        <Line
                          type="monotone"
                          dataKey="return"
                          stroke="#8884d8"
                          activeDot={{ r: 8 }}
                          name="Rendimiento mensual"
                          dot={{ strokeWidth: 2 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="mt-6 bg-blue-50 p-4 rounded-lg">
                    <h3 className="font-bold text-blue-800 mb-2">Análisis de rendimiento</h3>
                    <p className="text-sm text-blue-700 mb-2">
                      Rendimiento anual promedio: <strong>{selectedFund.annualReturn}%</strong>
                    </p>
                    <p className="text-sm text-blue-700">
                      Volatilidad:{" "}
                      <strong>
                        {selectedFund.risk === "bajo" ? "Baja" : selectedFund.risk === "moderado" ? "Media" : "Alta"}
                      </strong>
                    </p>
                  </div>
                </Card>

                <Card className="p-6">
                  <h3 className="font-bold text-green-800 mb-4">Comparativa de Fondos</h3>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        margin={{
                          top: 10,
                          right: 30,
                          left: 0,
                          bottom: 0,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" allowDuplicatedCategory={false} />
                        <YAxis tickFormatter={(value) => `${value}%`} />
                        <Tooltip formatter={(value) => [`${value}%`, undefined]} />
                        <Legend />
                        {investmentFunds.map((fund) => (
                          <Line
                            key={fund.id}
                            data={fund.historicalData}
                            type="monotone"
                            dataKey="return"
                            name={fund.name}
                            stroke={fund.risk === "bajo" ? "#3b82f6" : fund.risk === "moderado" ? "#f59e0b" : "#ef4444"}
                            strokeWidth={selectedFundId === fund.id ? 3 : 1}
                            dot={{ r: selectedFundId === fund.id ? 4 : 2 }}
                          />
                        ))}
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}

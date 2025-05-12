"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, CheckCircle2, PiggyBank, TrendingUp } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"

export default function AsesorPage() {
  const [step, setStep] = useState(1)
  const [ingresos, setIngresos] = useState(9000000)
  const [gastos, setGastos] = useState(6750000)
  const [deudas, setDeudas] = useState("no")
  const [objetivos, setObjetivos] = useState("ahorro")
  const [riesgo, setRiesgo] = useState(5)
  const [consejos, setConsejos] = useState([])

  const handleSubmit = (e) => {
    e.preventDefault()

    // Lógica para generar consejos personalizados basados en las respuestas
    const nuevosConsejos = []

    // Análisis de capacidad de ahorro
    const capacidadAhorro = ingresos - gastos
    const porcentajeAhorro = (capacidadAhorro / ingresos) * 100

    if (porcentajeAhorro < 10) {
      nuevosConsejos.push({
        titulo: "Aumenta tu capacidad de ahorro",
        descripcion:
          "Estás ahorrando menos del 10% de tus ingresos. Intenta reducir gastos no esenciales para aumentar este porcentaje a al menos un 20%.",
        tipo: "ahorro",
      })
    } else if (porcentajeAhorro >= 10 && porcentajeAhorro < 20) {
      nuevosConsejos.push({
        titulo: "Buen comienzo en ahorro",
        descripcion:
          "Estás ahorrando entre un 10-20% de tus ingresos. Considera automatizar estos ahorros para ser más consistente.",
        tipo: "ahorro",
      })
    } else {
      nuevosConsejos.push({
        titulo: "Excelente capacidad de ahorro",
        descripcion:
          "Ahorras más del 20% de tus ingresos. Considera diversificar estos ahorros en diferentes instrumentos financieros.",
        tipo: "inversion",
      })
    }

    // Consejos basados en deudas
    if (deudas === "si") {
      nuevosConsejos.push({
        titulo: "Prioriza el pago de deudas",
        descripcion:
          "Antes de invertir agresivamente, enfócate en pagar tus deudas de alto interés. Utiliza el método de avalancha (pagar primero las de mayor interés) o bola de nieve (pagar primero las más pequeñas).",
        tipo: "deuda",
      })
    }

    // Consejos basados en objetivos
    if (objetivos === "ahorro") {
      nuevosConsejos.push({
        titulo: "Estrategia de ahorro",
        descripcion:
          "Para maximizar tu ahorro, considera abrir una cuenta de alto rendimiento y establecer transferencias automáticas el día que recibas tu sueldo.",
        tipo: "ahorro",
      })
    } else if (objetivos === "inversion") {
      if (riesgo < 4) {
        nuevosConsejos.push({
          titulo: "Inversiones conservadoras",
          descripcion:
            "Con tu perfil de bajo riesgo, considera fondos de inversión conservadores, CDTs o bonos gubernamentales.",
          tipo: "inversion",
        })
      } else if (riesgo >= 4 && riesgo <= 7) {
        nuevosConsejos.push({
          titulo: "Inversiones moderadas",
          descripcion:
            "Con tu perfil de riesgo moderado, una cartera diversificada con 60% en fondos indexados y 40% en bonos podría ser adecuada.",
          tipo: "inversion",
        })
      } else {
        nuevosConsejos.push({
          titulo: "Inversiones agresivas",
          descripcion:
            "Con tu alta tolerancia al riesgo, podrías considerar una mayor exposición a renta variable, ETFs sectoriales o incluso pequeñas posiciones en criptomonedas (no más del 5% de tu cartera).",
          tipo: "inversion",
        })
      }
    } else if (objetivos === "vivienda") {
      nuevosConsejos.push({
        titulo: "Ahorro para vivienda",
        descripcion:
          "Para comprar una vivienda, establece una meta de ahorro del 20-30% del valor de la propiedad. Considera cuentas específicas para este fin que ofrezcan ventajas fiscales.",
        tipo: "ahorro",
      })
    }

    // Consejo general sobre fondo de emergencia
    nuevosConsejos.push({
      titulo: "Fondo de emergencia",
      descripcion:
        "Asegúrate de tener un fondo de emergencia que cubra 3-6 meses de gastos antes de realizar inversiones de mayor riesgo.",
      tipo: "ahorro",
    })

    setConsejos(nuevosConsejos)
    setStep(2)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
          <Link href="/" className="flex items-center">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver al inicio
          </Link>
          <div className="ml-auto flex items-center">
            <PiggyBank className="h-6 w-6 text-green-600" />
            <span className="ml-2 text-xl font-bold">AhorrarT</span>
          </div>
        </div>
      </header>
      <main className="flex-1 py-12">
        <div className="container px-4 md:px-6">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Asesor Financiero Personal</h1>
            <p className="text-gray-500">Recibe consejos personalizados basados en tu situación financiera</p>
          </div>

          {step === 1 ? (
            <Card>
              <CardHeader>
                <CardTitle>Cuestionario Financiero</CardTitle>
                <CardDescription>
                  Responde estas preguntas para recibir consejos adaptados a tu situación
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="ingresos">¿Cuáles son tus ingresos mensuales? ($)</Label>
                    <Input
                      id="ingresos"
                      type="number"
                      value={ingresos}
                      onChange={(e) => setIngresos(Number(e.target.value))}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="gastos">¿Cuáles son tus gastos mensuales aproximados? ($)</Label>
                    <Input
                      id="gastos"
                      type="number"
                      value={gastos}
                      onChange={(e) => setGastos(Number(e.target.value))}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>¿Tienes deudas de alto interés? (tarjetas de crédito, préstamos personales)</Label>
                    <RadioGroup value={deudas} onValueChange={setDeudas} className="flex space-x-4">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="si" id="deudas-si" />
                        <Label htmlFor="deudas-si">Sí</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="no" id="deudas-no" />
                        <Label htmlFor="deudas-no">No</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="objetivos">¿Cuál es tu principal objetivo financiero?</Label>
                    <Select value={objetivos} onValueChange={setObjetivos}>
                      <SelectTrigger id="objetivos">
                        <SelectValue placeholder="Selecciona un objetivo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ahorro">Aumentar mis ahorros</SelectItem>
                        <SelectItem value="inversion">Comenzar a invertir</SelectItem>
                        <SelectItem value="deuda">Pagar deudas</SelectItem>
                        <SelectItem value="vivienda">Comprar una vivienda</SelectItem>
                        <SelectItem value="jubilacion">Planificar jubilación</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label htmlFor="riesgo">Tolerancia al riesgo (1-10)</Label>
                      <span>{riesgo}/10</span>
                    </div>
                    <Slider
                      id="riesgo"
                      min={1}
                      max={10}
                      step={1}
                      value={[riesgo]}
                      onValueChange={(value) => setRiesgo(value[0])}
                    />
                    <div className="flex justify-between text-sm text-gray-500">
                      <span>Conservador</span>
                      <span>Moderado</span>
                      <span>Agresivo</span>
                    </div>
                  </div>

                  <Button type="submit" className="w-full">
                    Obtener consejos personalizados
                  </Button>
                </form>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <TrendingUp className="mr-2 h-5 w-5" />
                    Tu Análisis Financiero
                  </CardTitle>
                  <CardDescription>
                    Basado en tus respuestas, hemos preparado estos consejos personalizados
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-lg bg-green-50 p-4 mb-6">
                    <h3 className="text-lg font-semibold">Resumen de tu situación</h3>
                    <ul className="mt-2 space-y-1">
                      <li>
                        Ingresos mensuales: <strong>${ingresos.toLocaleString("es-CO")}</strong>
                      </li>
                      <li>
                        Gastos mensuales: <strong>${gastos.toLocaleString("es-CO")}</strong>
                      </li>
                      <li>
                        Capacidad de ahorro: <strong>${(ingresos - gastos).toLocaleString("es-CO")}</strong> (
                        {(((ingresos - gastos) / ingresos) * 100).toFixed(1)}% de tus ingresos)
                      </li>
                    </ul>
                  </div>

                  <div className="space-y-4">
                    {consejos.map((consejo, index) => (
                      <div key={index} className="rounded-lg border p-4">
                        <div className="flex items-start">
                          <CheckCircle2 className="mr-3 h-5 w-5 text-green-600 mt-0.5" />
                          <div>
                            <h3 className="font-semibold">{consejo.titulo}</h3>
                            <p className="text-gray-600">{consejo.descripcion}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setStep(1)}>
                  Volver al cuestionario
                </Button>
                <Link href="/simulador">
                  <Button>Ir al simulador financiero</Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </main>
      <footer className="w-full border-t bg-background py-6">
        <div className="container flex flex-col items-center justify-center gap-4 md:flex-row md:gap-8">
          <p className="text-center text-sm text-muted-foreground md:text-left">
            © 2025 AhorrarT. Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </div>
  )
}

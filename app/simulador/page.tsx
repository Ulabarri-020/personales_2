"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Calculator, PiggyBank } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function SimuladorPage() {
  const [ahorroInicial, setAhorroInicial] = useState(4500000)
  const [aportacionMensual, setAportacionMensual] = useState(450000)
  const [tasaInteres, setTasaInteres] = useState(5)
  const [plazoAnios, setPlazoAnios] = useState(10)
  const [saldo, setSaldo] = useState(0)
  const [historialTransacciones, setHistorialTransacciones] = useState([
    { tipo: "Depósito inicial", monto: 4500000, fecha: "01/04/2025" },
  ])

  // Calcular el ahorro futuro con interés compuesto
  const calcularAhorroFuturo = () => {
    const tasaDecimal = tasaInteres / 100
    const meses = plazoAnios * 12

    let montoFinal = ahorroInicial
    for (let i = 0; i < meses; i++) {
      montoFinal = montoFinal * (1 + tasaDecimal / 12) + aportacionMensual
    }

    return montoFinal.toFixed(0)
  }

  // Formatear moneda
  const formatCurrency = (value) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  // Simular un depósito
  const realizarDeposito = (monto) => {
    if (monto <= 0) return

    const nuevoSaldo = saldo + monto
    setSaldo(nuevoSaldo)

    const nuevaTransaccion = {
      tipo: "Depósito",
      monto: monto,
      fecha: new Date().toLocaleDateString(),
    }

    setHistorialTransacciones([nuevaTransaccion, ...historialTransacciones])
  }

  // Simular un retiro
  const realizarRetiro = (monto) => {
    if (monto <= 0 || monto > saldo) return

    const nuevoSaldo = saldo - monto
    setSaldo(nuevoSaldo)

    const nuevaTransaccion = {
      tipo: "Retiro",
      monto: monto,
      fecha: new Date().toLocaleDateString(),
    }

    setHistorialTransacciones([nuevaTransaccion, ...historialTransacciones])
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
            <h1 className="text-3xl font-bold">Simulador Financiero</h1>
            <p className="text-gray-500">Planifica tu futuro financiero y gestiona tus ahorros</p>
          </div>

          <Tabs defaultValue="calculadora" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="calculadora">Calculadora de Ahorro</TabsTrigger>
              <TabsTrigger value="cuenta">Mi Cuenta Virtual</TabsTrigger>
            </TabsList>

            <TabsContent value="calculadora" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Calculator className="mr-2 h-5 w-5" />
                    Calculadora de Interés Compuesto
                  </CardTitle>
                  <CardDescription>Simula cómo crecerán tus ahorros con el poder del interés compuesto</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="ahorroInicial">Ahorro inicial ($)</Label>
                    <Input
                      id="ahorroInicial"
                      type="number"
                      value={ahorroInicial}
                      onChange={(e) => setAhorroInicial(Number(e.target.value))}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="aportacionMensual">Aportación mensual ($)</Label>
                    <Input
                      id="aportacionMensual"
                      type="number"
                      value={aportacionMensual}
                      onChange={(e) => setAportacionMensual(Number(e.target.value))}
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label htmlFor="tasaInteres">Tasa de interés anual (%)</Label>
                      <span>{tasaInteres}%</span>
                    </div>
                    <Slider
                      id="tasaInteres"
                      min={0}
                      max={15}
                      step={0.1}
                      value={[tasaInteres]}
                      onValueChange={(value) => setTasaInteres(value[0])}
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label htmlFor="plazoAnios">Plazo (años)</Label>
                      <span>{plazoAnios} años</span>
                    </div>
                    <Slider
                      id="plazoAnios"
                      min={1}
                      max={40}
                      step={1}
                      value={[plazoAnios]}
                      onValueChange={(value) => setPlazoAnios(value[0])}
                    />
                  </div>

                  <div className="rounded-lg bg-green-50 p-4">
                    <h3 className="mb-2 font-semibold">Resultado:</h3>
                    <div className="flex items-baseline justify-between">
                      <span>Monto final estimado:</span>
                      <span className="text-2xl font-bold text-green-600">
                        {formatCurrency(calcularAhorroFuturo())}
                      </span>
                    </div>
                    <div className="mt-2 text-sm text-gray-500">
                      Aportación total: {formatCurrency(ahorroInicial + aportacionMensual * plazoAnios * 12)}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="cuenta" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <PiggyBank className="mr-2 h-5 w-5" />
                    Mi Cuenta Virtual
                  </CardTitle>
                  <CardDescription>Simula depósitos y retiros para practicar la gestión de tu dinero</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="rounded-lg bg-green-50 p-4">
                    <h3 className="mb-2 font-semibold">Saldo actual:</h3>
                    <div className="text-3xl font-bold text-green-600">{formatCurrency(saldo)}</div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="deposito">Realizar depósito ($)</Label>
                      <div className="flex space-x-2">
                        <Input id="deposito" type="number" placeholder="Monto" />
                        <Button onClick={() => realizarDeposito(Number(document.getElementById("deposito").value))}>
                          Depositar
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="retiro">Realizar retiro ($)</Label>
                      <div className="flex space-x-2">
                        <Input id="retiro" type="number" placeholder="Monto" />
                        <Button
                          variant="outline"
                          onClick={() => realizarRetiro(Number(document.getElementById("retiro").value))}
                        >
                          Retirar
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="mb-2 font-semibold">Historial de transacciones:</h3>
                    <div className="max-h-60 overflow-y-auto rounded-lg border">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b bg-muted/50">
                            <th className="p-2 text-left font-medium">Tipo</th>
                            <th className="p-2 text-left font-medium">Monto</th>
                            <th className="p-2 text-left font-medium">Fecha</th>
                          </tr>
                        </thead>
                        <tbody>
                          {historialTransacciones.map((transaccion, index) => (
                            <tr key={index} className="border-b">
                              <td className="p-2">{transaccion.tipo}</td>
                              <td className="p-2">{formatCurrency(transaccion.monto)}</td>
                              <td className="p-2">{transaccion.fecha}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
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

"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, TrendingUp, ArrowUpRight, ArrowDownRight, Wallet } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Tipo para las transacciones
type Transaction = {
  id: string
  type: "deposit" | "withdrawal"
  amount: number
  description: string
  date: string
}

export default function CuentaPage() {
  // Estado para el balance y transacciones
  const [balance, setBalance] = useState<number>(0)
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [amount, setAmount] = useState<string>("")
  const [description, setDescription] = useState<string>("")
  const [advice, setAdvice] = useState<string>("")

  // Cargar datos del localStorage al iniciar
  useEffect(() => {
    const savedBalance = localStorage.getItem("balance")
    const savedTransactions = localStorage.getItem("transactions")

    if (savedBalance) {
      setBalance(Number.parseFloat(savedBalance))
    }

    if (savedTransactions) {
      setTransactions(JSON.parse(savedTransactions))
    } else {
      // Datos de ejemplo si no hay transacciones guardadas
      const exampleTransactions: Transaction[] = [
        {
          id: "1",
          type: "deposit",
          amount: 4500000,
          description: "Salario",
          date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        },
        {
          id: "2",
          type: "withdrawal",
          amount: 675000,
          description: "Compras supermercado",
          date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        },
        {
          id: "3",
          type: "deposit",
          amount: 900000,
          description: "Reembolso",
          date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        },
      ]

      setTransactions(exampleTransactions)

      // Calcular balance inicial basado en las transacciones de ejemplo
      const initialBalance = exampleTransactions.reduce((acc, transaction) => {
        return transaction.type === "deposit" ? acc + transaction.amount : acc - transaction.amount
      }, 0)

      setBalance(initialBalance)
    }

    // Generar consejo financiero
    generateAdvice()
  }, [])

  // Guardar cambios en localStorage cuando cambia el balance o las transacciones
  useEffect(() => {
    localStorage.setItem("balance", balance.toString())
    localStorage.setItem("transactions", JSON.stringify(transactions))

    // Actualizar consejo cuando cambian las transacciones
    if (transactions.length > 0) {
      generateAdvice()
    }
  }, [balance, transactions])

  // Función para generar consejos financieros basados en los hábitos del usuario
  const generateAdvice = () => {
    const withdrawals = transactions.filter((t) => t.type === "withdrawal")
    const deposits = transactions.filter((t) => t.type === "deposit")

    const totalWithdrawals = withdrawals.reduce((sum, t) => sum + t.amount, 0)
    const totalDeposits = deposits.reduce((sum, t) => sum + t.amount, 0)

    // Diferentes consejos basados en los patrones de gasto
    const adviceList = [
      "Intenta ahorrar al menos el 20% de tus ingresos mensuales.",
      "Crea un fondo de emergencia que cubra 3-6 meses de gastos.",
      "Considera invertir parte de tus ahorros para hacerlos crecer.",
      "Revisa tus gastos semanalmente para identificar áreas donde puedes reducir.",
      "Establece metas financieras específicas y realistas.",
    ]

    if (withdrawals.length > deposits.length * 2) {
      setAdvice(
        "Estás realizando muchos retiros. Considera establecer un presupuesto mensual para controlar tus gastos.",
      )
    } else if (totalWithdrawals > totalDeposits * 0.8) {
      setAdvice(
        "Estás gastando más del 80% de lo que ingresas. Intenta reducir gastos no esenciales para aumentar tu tasa de ahorro.",
      )
    } else if (balance < 500) {
      setAdvice("Tu balance es bajo. Considera aumentar tus ahorros para crear un fondo de emergencia.")
    } else {
      // Seleccionar un consejo aleatorio
      const randomAdvice = adviceList[Math.floor(Math.random() * adviceList.length)]
      setAdvice(randomAdvice)
    }
  }

  // Función para realizar un depósito
  const handleDeposit = () => {
    if (!amount || Number.parseFloat(amount) <= 0) {
      alert("Por favor ingresa una cantidad válida")
      return
    }

    const newTransaction: Transaction = {
      id: Date.now().toString(),
      type: "deposit",
      amount: Number.parseFloat(amount),
      description: description || "Depósito",
      date: new Date().toISOString(),
    }

    setTransactions([newTransaction, ...transactions])
    setBalance((prevBalance) => prevBalance + Number.parseFloat(amount))
    setAmount("")
    setDescription("")
  }

  // Función para realizar un retiro
  const handleWithdrawal = () => {
    if (!amount || Number.parseFloat(amount) <= 0) {
      alert("Por favor ingresa una cantidad válida")
      return
    }

    if (Number.parseFloat(amount) > balance) {
      alert("No tienes suficiente saldo para este retiro")
      return
    }

    const newTransaction: Transaction = {
      id: Date.now().toString(),
      type: "withdrawal",
      amount: Number.parseFloat(amount),
      description: description || "Retiro",
      date: new Date().toISOString(),
    }

    setTransactions([newTransaction, ...transactions])
    setBalance((prevBalance) => prevBalance - Number.parseFloat(amount))
    setAmount("")
    setDescription("")
  }

  // Formatear fecha para mostrar
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("es-CO", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
  }

  return (
    <div className="min-h-screen bg-green-50">
      {/* Navegación */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <Link href="/" className="flex items-center space-x-2 text-green-700 hover:text-green-600 transition">
            <ArrowLeft className="h-5 w-5" />
            <span className="ml-2 text-xl font-bold">AhorraT</span>
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-green-800 mb-8">Mi Cuenta Financiera</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Panel izquierdo - Resumen */}
          <div className="lg:col-span-1">
            <Card className="p-6 mb-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-green-800">Balance Actual</h2>
                <Wallet className="h-6 w-6 text-green-600" />
              </div>
              <p className="text-4xl font-bold text-green-700 mb-4">${balance.toFixed(2)}</p>

              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="bg-green-100 p-4 rounded-lg">
                  <div className="flex items-center text-green-700 mb-2">
                    <ArrowUpRight className="h-5 w-5 mr-2" />
                    <span className="font-medium">Ingresos</span>
                  </div>
                  <p className="text-xl font-bold text-green-800">
                    $
                    {transactions
                      .filter((t) => t.type === "deposit")
                      .reduce((sum, t) => sum + t.amount, 0)
                      .toFixed(2)}
                  </p>
                </div>

                <div className="bg-red-100 p-4 rounded-lg">
                  <div className="flex items-center text-red-700 mb-2">
                    <ArrowDownRight className="h-5 w-5 mr-2" />
                    <span className="font-medium">Gastos</span>
                  </div>
                  <p className="text-xl font-bold text-red-800">
                    $
                    {transactions
                      .filter((t) => t.type === "withdrawal")
                      .reduce((sum, t) => sum + t.amount, 0)
                      .toFixed(2)}
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-green-700 text-white">
              <div className="flex items-center mb-4">
                <TrendingUp className="h-6 w-6 mr-2" />
                <h2 className="text-xl font-bold">Consejo Financiero</h2>
              </div>
              <p className="text-green-100">{advice}</p>
            </Card>
          </div>

          {/* Panel derecho - Transacciones y formulario */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="transactions">
              <TabsList className="grid grid-cols-2 mb-6">
                <TabsTrigger value="transactions">Historial de Transacciones</TabsTrigger>
                <TabsTrigger value="operation">Realizar Operación</TabsTrigger>
              </TabsList>

              <TabsContent value="transactions">
                <Card className="p-6">
                  <h2 className="text-xl font-bold text-green-800 mb-6">Historial de Transacciones</h2>

                  {transactions.length === 0 ? (
                    <p className="text-gray-500 text-center py-8">No hay transacciones registradas</p>
                  ) : (
                    <div className="space-y-4">
                      {transactions.map((transaction) => (
                        <div
                          key={transaction.id}
                          className={`p-4 rounded-lg border flex justify-between items-center ${
                            transaction.type === "deposit" ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"
                          }`}
                        >
                          <div className="flex items-center">
                            <div
                              className={`w-10 h-10 rounded-full flex items-center justify-center mr-4 ${
                                transaction.type === "deposit" ? "bg-green-200" : "bg-red-200"
                              }`}
                            >
                              {transaction.type === "deposit" ? (
                                <ArrowUpRight className="h-5 w-5 text-green-700" />
                              ) : (
                                <ArrowDownRight className="h-5 w-5 text-red-700" />
                              )}
                            </div>
                            <div>
                              <p className="font-medium">{transaction.description}</p>
                              <p className="text-sm text-gray-500">{formatDate(transaction.date)}</p>
                            </div>
                          </div>
                          <p
                            className={`font-bold ${
                              transaction.type === "deposit" ? "text-green-700" : "text-red-700"
                            }`}
                          >
                            {transaction.type === "deposit" ? "+" : "-"}${transaction.amount.toFixed(2)}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </Card>
              </TabsContent>

              <TabsContent value="operation">
                <Card className="p-6">
                  <h2 className="text-xl font-bold text-green-800 mb-6">Realizar Operación</h2>

                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="amount">Cantidad ($)</Label>
                      <Input
                        id="amount"
                        type="number"
                        placeholder="0.00"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                      />
                    </div>

                    <div>
                      <Label htmlFor="description">Descripción</Label>
                      <Input
                        id="description"
                        placeholder="Ej: Salario, Compras, etc."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4 pt-4">
                      <Button onClick={handleDeposit} className="bg-green-600 hover:bg-green-700">
                        Depositar
                      </Button>

                      <Button
                        onClick={handleWithdrawal}
                        variant="outline"
                        className="border-red-500 text-red-500 hover:bg-red-50"
                      >
                        Retirar
                      </Button>
                    </div>
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

"use client";
import { useState } from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

interface Gasto {
  id: number
  descripcion: string
  monto: number
}

export default function CalculadoraPresupuesto() {
  const [ingresos, setIngresos] = useState<number>(0)
  const [gastos, setGastos] = useState<Gasto[]>([])
  const [descGasto, setDescGasto] = useState("")
  const [montoGasto, setMontoGasto] = useState<number>(0)

  function agregarGasto() {
    if (descGasto.trim() && montoGasto > 0) {
      setGastos([...gastos, { id: Date.now(), descripcion: descGasto, monto: montoGasto }])
      setDescGasto("")
      setMontoGasto(0)
    }
  }

  const totalGastos = gastos.reduce((acc, gasto) => acc + gasto.monto, 0)
  const saldo = ingresos - totalGastos

  return (
    <div className="min-h-screen bg-green-50 p-6">
      <Link
        href="/calculadora"
        className="text-[#16A24A] flex items-center mb-6 hover:text-green-700"
      >
        <ArrowLeft className="mr-2" /> Volver a Calculadoras
      </Link>

      <h1 className="text-2xl font-bold text-[#16A24A] mb-4">Calculadora de Presupuesto</h1>

      <div className="max-w-md bg-white rounded shadow p-6">
        <label className="block mb-4">
          <span className="text-gray-700">Ingresos totales ($)</span>
          <input
            type="number"
            value={ingresos}
            onChange={(e) => setIngresos(Number(e.target.value))}
            className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
            min={0}
          />
        </label>

        <div className="mb-4 border-t border-gray-300 pt-4">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">Agregar gasto</h2>
          <input
            type="text"
            placeholder="Descripción"
            value={descGasto}
            onChange={(e) => setDescGasto(e.target.value)}
            className="mb-2 block w-full border border-gray-300 rounded px-3 py-2"
          />
          <input
            type="number"
            placeholder="Monto"
            value={montoGasto}
            onChange={(e) => setMontoGasto(Number(e.target.value))}
            className="mb-2 block w-full border border-gray-300 rounded px-3 py-2"
            min={0}
          />
          <button
            onClick={agregarGasto}
            className="bg-[#16A24A] text-white px-4 py-2 rounded hover:bg-green-700 transition"
          >
            Agregar gasto
          </button>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-[#16A24A] mb-2">Gastos</h3>
          <ul className="mb-4 max-h-48 overflow-auto">
            {gastos.map((gasto) => (
              <li key={gasto.id} className="flex justify-between border-b border-gray-200 py-1">
                <span>{gasto.descripcion}</span>
                <span>${gasto.monto.toFixed(2)}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="text-lg font-semibold text-[#16A24A]">
          <p>Total gastos: ${totalGastos.toFixed(2)}</p>
          <p>Saldo restante: ${saldo.toFixed(2)}</p>
        </div>
      </div>
    </div>
  )
}

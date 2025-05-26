"use client";
import { useState } from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function CalculadoraPrestamos() {
  const [monto, setMonto] = useState<number>(0)
  const [tasaAnual, setTasaAnual] = useState<number>(10)
  const [plazoMeses, setPlazoMeses] = useState<number>(12)
  const [cuotaMensual, setCuotaMensual] = useState<number | null>(null)

  // Fórmula cuota mensual préstamo con interés compuesto
  // cuota = P * r * (1+r)^n / ((1+r)^n -1)
  // r = tasa mensual decimal, n = número de pagos

  function calcularCuota() {
    const P = monto
    const r = tasaAnual / 100 / 12
    const n = plazoMeses
    if (r === 0) {
      setCuotaMensual(P / n)
    } else {
      const cuota = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1)
      setCuotaMensual(cuota)
    }
  }

  return (
    <div className="min-h-screen bg-green-50 p-6">
      <Link
        href="/calculadora"
        className="text-[#16A24A] flex items-center mb-6 hover:text-green-700"
      >
        <ArrowLeft className="mr-2" /> Volver a Calculadoras
      </Link>

      <h1 className="text-2xl font-bold text-[#16A24A] mb-4">Calculadora de Préstamos</h1>

      <div className="max-w-md bg-white rounded shadow p-6">
        <label className="block mb-4">
          <span className="text-gray-700">Monto del préstamo ($)</span>
          <input
            type="number"
            value={monto}
            onChange={(e) => setMonto(Number(e.target.value))}
            className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
            min={0}
          />
        </label>

        <label className="block mb-4">
          <span className="text-gray-700">Tasa anual (%)</span>
          <input
            type="number"
            value={tasaAnual}
            onChange={(e) => setTasaAnual(Number(e.target.value))}
            className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
            min={0}
            step={0.01}
          />
        </label>

        <label className="block mb-4">
          <span className="text-gray-700">Plazo (meses)</span>
          <input
            type="number"
            value={plazoMeses}
            onChange={(e) => setPlazoMeses(Number(e.target.value))}
            className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
            min={1}
          />
        </label>

        <button
          onClick={calcularCuota}
          className="bg-[#16A24A] text-white px-4 py-2 rounded hover:bg-green-700 transition"
        >
          Calcular
        </button>

        {cuotaMensual !== null && (
          <div className="mt-6 text-lg font-semibold text-[#16A24A]">
            Cuota mensual estimada: ${cuotaMensual.toFixed(2)}
          </div>
        )}
      </div>
    </div>
  )
}

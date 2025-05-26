"use client";

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function CalculadoraAhorros() {
  const [aporteMensual, setAporteMensual] = useState<number>(0)
  const [tasaAnual, setTasaAnual] = useState<number>(5)
  const [meses, setMeses] = useState<number>(12)
  const [resultado, setResultado] = useState<number | null>(null)

  // Fórmula para valor futuro con aportes mensuales y tasa periódica mensual compuesta
  // VF = aporte * (( (1 + r)^n -1 ) / r)
  // r = tasa mensual en decimal, n = meses

  function calcularAhorro() {
    const r = tasaAnual / 100 / 12
    const n = meses
    if (r === 0) {
      setResultado(aporteMensual * n)
    } else {
      const vf = aporteMensual * ((Math.pow(1 + r, n) - 1) / r)
      setResultado(vf)
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

      <h1 className="text-2xl font-bold text-[#16A24A] mb-4">Calculadora de Ahorros</h1>

      <div className="max-w-md bg-white rounded shadow p-6">
        <label className="block mb-4">
          <span className="text-gray-700">Aporte mensual ($)</span>
          <input
            type="number"
            value={aporteMensual}
            onChange={(e) => setAporteMensual(Number(e.target.value))}
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
          <span className="text-gray-700">Meses</span>
          <input
            type="number"
            value={meses}
            onChange={(e) => setMeses(Number(e.target.value))}
            className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
            min={1}
          />
        </label>

        <button
          onClick={calcularAhorro}
          className="bg-[#16A24A] text-white px-4 py-2 rounded hover:bg-green-700 transition"
        >
          Calcular
        </button>

        {resultado !== null && (
          <div className="mt-6 text-lg font-semibold text-[#16A24A]">
            Valor futuro estimado: ${resultado.toFixed(2)}
          </div>
        )}
      </div>
    </div>
  )
}

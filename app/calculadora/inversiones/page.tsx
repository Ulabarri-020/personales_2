"use client";
import { useState } from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function CalculadoraInversiones() {
  const [capitalInicial, setCapitalInicial] = useState<number>(0)
  const [tasaAnual, setTasaAnual] = useState<number>(7)
  const [anos, setAnos] = useState<number>(5)
  const [resultado, setResultado] = useState<number | null>(null)

  // Fórmula de interés compuesto:
  // VF = P * (1 + r)^n
  // P = capital inicial, r = tasa anual decimal, n = años

  function calcularInversion() {
    const P = capitalInicial
    const r = tasaAnual / 100
    const n = anos

    const vf = P * Math.pow(1 + r, n)
    setResultado(vf)
  }

  return (
    <div className="min-h-screen bg-green-50 p-6">
      <Link
        href="/calculadora"
        className="text-[#16A24A] flex items-center mb-6 hover:text-green-700"
      >
        <ArrowLeft className="mr-2" /> Volver a Calculadoras
      </Link>

      <h1 className="text-2xl font-bold text-[#16A24A] mb-4">Calculadora de Inversiones</h1>

      <div className="max-w-md bg-white rounded shadow p-6">
        <label className="block mb-4">
          <span className="text-gray-700">Capital inicial ($)</span>
          <input
            type="number"
            value={capitalInicial}
            onChange={(e) => setCapitalInicial(Number(e.target.value))}
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
          <span className="text-gray-700">Años</span>
          <input
            type="number"
            value={anos}
            onChange={(e) => setAnos(Number(e.target.value))}
            className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
            min={1}
          />
        </label>

        <button
          onClick={calcularInversion}
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

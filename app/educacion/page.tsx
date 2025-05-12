import Link from "next/link"
import { ArrowLeft, BookOpen, PiggyBank, TrendingUp } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function EducacionPage() {
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
            <h1 className="text-3xl font-bold">Educación Financiera</h1>
            <p className="text-gray-500">Aprende los conceptos fundamentales para mejorar tu salud financiera</p>
          </div>

          <Tabs defaultValue="conceptos" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="conceptos">Conceptos Básicos</TabsTrigger>
              <TabsTrigger value="ahorro">Estrategias de Ahorro</TabsTrigger>
              <TabsTrigger value="inversion">Inversión</TabsTrigger>
            </TabsList>

            <TabsContent value="conceptos" className="space-y-4">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                  <CardHeader>
                    <CardTitle>Presupuesto Personal</CardTitle>
                    <CardDescription>El primer paso hacia la salud financiera</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>
                      Un presupuesto es un plan que ayuda a controlar tus ingresos y gastos. Te permite saber
                      exactamente cuánto dinero entra y sale de tu bolsillo.
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      Leer más
                    </Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Fondo de Emergencia</CardTitle>
                    <CardDescription>Tu red de seguridad financiera</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>
                      Un fondo de emergencia es dinero que ahorras para gastos inesperados como reparaciones,
                      emergencias médicas o pérdida de empleo.
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      Leer más
                    </Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Deuda Buena vs Mala</CardTitle>
                    <CardDescription>No todas las deudas son iguales</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p>
                      La deuda buena te ayuda a crear valor o aumentar tus ingresos a largo plazo. La deuda mala
                      financia bienes que se deprecian rápidamente.
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      Leer más
                    </Button>
                  </CardFooter>
                </Card>
              </div>

              <Card className="mt-6">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BookOpen className="mr-2 h-5 w-5" />
                    Conceptos Financieros Básicos
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-semibold">¿Qué es el interés?</h3>
                      <p>
                        El interés es el costo de pedir dinero prestado o la recompensa por prestar dinero. Se expresa
                        como un porcentaje del monto principal.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold">Interés Simple vs Compuesto</h3>
                      <p>
                        El interés simple se calcula solo sobre el capital inicial. El interés compuesto se calcula
                        sobre el capital inicial más el interés acumulado de períodos anteriores.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold">La regla del 72</h3>
                      <p>
                        Es una fórmula que te permite calcular aproximadamente cuántos años tardará tu dinero en
                        duplicarse. Divide 72 entre la tasa de interés anual.
                      </p>
                      <div className="mt-2 rounded-md bg-green-50 p-3">
                        <p className="font-medium">
                          Ejemplo: Con una tasa de interés del 6%, tu dinero se duplicará en aproximadamente 72 ÷ 6 = 12
                          años.
                        </p>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold">Inflación</h3>
                      <p>
                        La inflación es el aumento generalizado y sostenido de los precios de bienes y servicios en un
                        período determinado. Reduce el poder adquisitivo de tu dinero con el tiempo.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="ahorro" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <PiggyBank className="mr-2 h-5 w-5" />
                    Estrategias Efectivas de Ahorro
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold">La regla 50/30/20</h3>
                      <p className="mb-2">Una forma sencilla de distribuir tus ingresos:</p>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>
                          <strong>50%</strong> para necesidades básicas (vivienda, alimentación, transporte)
                        </li>
                        <li>
                          <strong>30%</strong> para deseos (entretenimiento, viajes, restaurantes)
                        </li>
                        <li>
                          <strong>20%</strong> para ahorro e inversión
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold">Automatiza tus ahorros</h3>
                      <p>
                        Configura transferencias automáticas a tu cuenta de ahorros el mismo día que recibes tu sueldo.
                        Lo que no ves, no lo gastas.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold">El reto de los 30 días</h3>
                      <p>
                        Antes de hacer una compra no esencial, espera 30 días. Si después de ese tiempo sigues queriendo
                        el artículo, reconsidéralo.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold">Ahorra los aumentos</h3>
                      <p>
                        Cuando recibas un aumento de sueldo, mantén tu nivel de vida actual y destina la diferencia al
                        ahorro.
                      </p>
                    </div>

                    <div className="rounded-md bg-green-50 p-4">
                      <h3 className="text-lg font-semibold">Consejo práctico</h3>
                      <p>
                        Crea diferentes "sobres" o cuentas para objetivos específicos: vacaciones, fondo de emergencia,
                        compra de un coche, etc. Esto te ayudará a visualizar mejor tus metas.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="inversion" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <TrendingUp className="mr-2 h-5 w-5" />
                    Principios de Inversión
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold">¿Por qué invertir?</h3>
                      <p>
                        Invertir te permite hacer crecer tu dinero por encima de la inflación y alcanzar metas
                        financieras a largo plazo como la jubilación.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold">Riesgo vs Rendimiento</h3>
                      <p>
                        En general, a mayor riesgo, mayor rendimiento potencial. Es importante encontrar un equilibrio
                        según tu tolerancia al riesgo y horizonte temporal.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold">Diversificación</h3>
                      <p>
                        No pongas todos los huevos en la misma canasta. Distribuye tus inversiones entre diferentes
                        tipos de activos para reducir el riesgo.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold">Inversión a largo plazo</h3>
                      <p>
                        El tiempo es tu mejor aliado en la inversión. Cuanto más tiempo mantengas tus inversiones, mayor
                        será la probabilidad de obtener rendimientos positivos y superar las fluctuaciones del mercado.
                      </p>
                    </div>

                    <div className="rounded-md bg-green-50 p-4">
                      <h3 className="text-lg font-semibold">Tipos de inversiones para principiantes</h3>
                      <ul className="list-disc pl-5 space-y-1">
                        <li>
                          <strong>Fondos indexados</strong>: Siguen el rendimiento de un índice como el COLCAP.
                        </li>
                        <li>
                          <strong>ETFs</strong>: Fondos cotizados que combinan la diversificación con bajas comisiones.
                        </li>
                        <li>
                          <strong>Planes de pensiones</strong>: Inversiones a largo plazo con ventajas fiscales.
                        </li>
                        <li>
                          <strong>CDTs</strong>: Menor rendimiento pero mayor seguridad.
                        </li>
                      </ul>
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

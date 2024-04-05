import type { VehicleResult } from "@/types/fipe"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

type VehicleCardProps = { vehicle: VehicleResult }


export function VehicleCard({ vehicle }: VehicleCardProps) {

  return (
    <Card className="w-72 md:w-[380px] mx-auto">
      <CardHeader>
        <CardTitle>{vehicle.Modelo}</CardTitle>
        <CardDescription>{vehicle.Marca}</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">

        <div className=" flex items-center space-x-4 rounded-md border p-4">
          <div className="flex-1">
            <p className="text-sm text-muted-foreground">
              Marca: <span className="font-bold">{vehicle.Marca}</span>
            </p>
          </div>
        </div>
        <div className=" flex items-center space-x-4 rounded-md border p-4">
          <div className="flex-1">
            <p className="text-sm text-muted-foreground">
              Ano: <span className="font-bold">{vehicle.AnoModelo}</span>
            </p>
          </div>
        </div>
        <div className=" flex items-center space-x-4 rounded-md border p-4">
          <div className="flex-1">
            <p className="text-sm text-muted-foreground">
              Combustível: <span className="font-bold">{vehicle.Combustivel}</span>
            </p>
          </div>
        </div>
        <div className=" flex items-center space-x-4 rounded-md border p-4">
          <div className="flex-1">
            <p className="text-sm text-muted-foreground">
              Código Fipe: <span className="font-bold">{vehicle.CodigoFipe}</span>
            </p>
          </div>
        </div>

      </CardContent>
      <CardFooter>
        <div className="mx-auto text-center">
          <h3 className="text-2xl">
            Valor: {" "}
            <span className="font-bold">
              {vehicle.Valor}
            </span>
          </h3>
        </div>
      </CardFooter>
    </Card>
  )
}


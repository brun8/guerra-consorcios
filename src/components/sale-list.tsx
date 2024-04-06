import type { VehicleType } from "@/types/fipe"
import { api } from "@/utils/api"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Skeleton } from "@/components/ui/skeleton"

type SaleListProps = {
  type: VehicleType
}
export function SaleList({ type }: SaleListProps) {
  const { data: vehicles, isFetching } = api.vehicle.getAll.useQuery({ type })

  const isEmpty = vehicles && vehicles.length === 0

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="">Modelo</TableHead>
            <TableHead className="w-[150px]">Ano</TableHead>
            <TableHead className="w-[80px]">Combustível</TableHead>
            <TableHead className="text-right">Preço</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {isFetching &&
            <TableRow>
              <TableCell className="font-medium">
                <Skeleton className="h-4 w-full" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-full" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-4 w-full" />
              </TableCell>
              <TableCell className="text-right font-bold">
                <Skeleton className="h-4 w-full" />
              </TableCell>
            </TableRow>
          }
          {!isFetching && vehicles && !isEmpty &&
            vehicles.map((vehicle) => (
              <TableRow key={vehicle.id}>
                <TableCell className="font-medium">{vehicle.model}</TableCell>
                <TableCell>{vehicle.year}</TableCell>
                <TableCell>{vehicle.fuel}</TableCell>
                <TableCell className="text-right font-bold">{vehicle.price}</TableCell>
              </TableRow>
            ))
          }
          {!isFetching && isEmpty &&
            <TableRow>
              <TableCell className="font-medium text-neutral-300">Lista vazia.</TableCell>
            </TableRow>
          }
        </TableBody>
      </Table>

    </div >
  )
}

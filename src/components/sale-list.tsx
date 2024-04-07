import type { VehicleType } from "@/types/fipe"
import { api } from "@/utils/api"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Skeleton } from "@/components/ui/skeleton"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip"
import { Button } from "./ui/button"
import toast from "react-hot-toast"

type SaleListProps = {
  type: VehicleType
}
export function SaleList({ type }: SaleListProps) {
  const { data: vehicles, isFetching } = api.vehicle.getAll.useQuery({ type })

  const isEmpty = vehicles && vehicles.length === 0

  function copyToClipboard(text: string) {
    navigator.clipboard.writeText(text).then(() => toast.success("Email copiado"))
  }

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="">Modelo</TableHead>
            <TableHead className="">Email</TableHead>
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
                <TableCell>
                  <TooltipProvider>
                    <Tooltip delayDuration={50}>
                      <TooltipTrigger>
                        <Button variant="ghost" onClick={() => copyToClipboard(vehicle.email)}>
                          {vehicle.email}
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        Copiar
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </TableCell>
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

import toast from "react-hot-toast";
import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { api } from "@/utils/api";


export default function Listings() {
  const { data: vehicles, isFetching, refetch } = api.vehicle.getAll.useQuery()
  const { mutate, isPending } = api.vehicle.delete.useMutation({
    onError: () => toast.error("Erro ao remover listagem"),
    onSuccess: () => {
      toast.success("Listagem removida")
      void refetch()
    }
  })

  const isEmpty = vehicles && vehicles.length === 0

  function copyToClipboard(text: string) {
    navigator.clipboard.writeText(text)
      .then(() => toast.success("Email copiado"))
      .catch(() => toast.error("Erro ao copiar"))
  }

  function deleteListing(id: string) {
    mutate({ id })
  }

  return (
    <Layout title="Listagens">
      <div className="w-[90%] max-w-5xl mx-auto space-y-4 mt-8">
        <h2 className="font-bold text-3xl">
          Listagens
        </h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="">Modelo</TableHead>
              <TableHead className="">Email</TableHead>
              <TableHead className="w-[150px]">Ano</TableHead>
              <TableHead className="w-[80px]">Combustível</TableHead>
              <TableHead className="w-[80px]">Preço</TableHead>
              <TableHead className="text-right">Remover</TableHead>
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
                          <div onClick={() => copyToClipboard(vehicle.email)}>
                            {vehicle.email}
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          Copiar
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </TableCell>
                  <TableCell>{vehicle.year}</TableCell>
                  <TableCell>{vehicle.fuel}</TableCell>
                  <TableCell>{vehicle.price}</TableCell>
                  <TableCell className="font-bold">
                    <Button variant="destructive" onClick={() => deleteListing(vehicle.id)} disabled={isPending}>
                      Remover
                    </Button>
                  </TableCell>
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
      </div>
    </Layout >
  )
}

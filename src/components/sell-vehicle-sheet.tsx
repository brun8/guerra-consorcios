import { useRef, useState } from "react"
import toast from "react-hot-toast"

import type { VehicleResult } from "@/types/fipe"
import { api } from "@/utils/api"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Spinner } from "@/components/spinner"


type SellVehicleSheetProps = {
  vehicle: VehicleResult
}

const priceFormatter = new Intl.NumberFormat('pt-br', {
  style: "currency", currency: "BRL"
})

export function SellVehicleSheet({ vehicle }: SellVehicleSheetProps) {
  const [open, setOpen] = useState(false)
  const priceRef = useRef<HTMLInputElement>(null)
  const emailRef = useRef<HTMLInputElement>(null)

  const { mutate, isPending } = api.vehicle.create.useMutation({
    onSuccess: () => {
      toast.success("Veículo listado para venda")
      setOpen(false)
    },
    onError: () => {
      toast.error("Erro ao listar veículo para venda")
    }
  })

  // pega o valor do campo price e retorna no formato R$0,00
  function formatPrice(value: string) {
    return priceFormatter.format(+value)
  }

  function submit() {
    const price = priceRef.current?.value ?? 0
    const email = emailRef.current?.value ?? ""

    if (!(price && email)) {
      toast.error("Informe preço e email de contato")
      return
    }

    mutate({
      price: formatPrice(price),
      email,
      fuel: vehicle.Combustivel,
      model: vehicle.Modelo,
      year: vehicle.AnoModelo,
    })

  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline">Listar para venda</Button>
      </SheetTrigger>
      <SheetContent side="bottom">
        <div className="max-w-xl mx-auto space-y-4 flex flex-col">
          <h3 className="font-bold text-xl">
            Listar veículo para venda
          </h3>
          <div className="space-y-2">
            <p>
              Veículo: <span className="font-bold">{vehicle.Modelo}</span>
            </p>
            <p>
              Ano: <span className="font-bold">{vehicle.AnoModelo}</span>
            </p>
            <p>
              Preço na tabela Fipe: <span className="font-bold">{vehicle.Valor} ({vehicle.MesReferencia})</span>
            </p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="price" className="text-right">
              Preço
            </Label>
            <Input id="price" type="number" ref={priceRef} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email" className="text-right">
              Email para contato
            </Label>
            <Input id="email" type="email" ref={emailRef} />
          </div>
          <Button
            onClick={submit}
            disabled={isPending}
            variant="indigo"
            className="mx-auto w-full"
          >
            {isPending &&
              <Spinner />
            }
            {!isPending && "Listar"}
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}


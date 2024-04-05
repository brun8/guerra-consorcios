import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import type { VehicleResult, VehicleType } from "@/types/fipe"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { fetchVehicleBrands, fetchVehicleModels, fetchVehicleValue, normalizeTypeName } from "@/utils/fipe";
import { Spinner } from "@/components/spinner";
import { Button } from "@/components/ui/button";
import { type BrandInfo, type BaseFipeResponse } from "@/types/fipe";
import { VehicleCard } from "./vehicle-card";


type VehicleSearchProps = {
  type: VehicleType
}

export function VehicleSearch({ type }: VehicleSearchProps) {
  //options
  const [brands, setBrands] = useState<BaseFipeResponse[]>([])
  const [models, setModels] = useState<BaseFipeResponse[]>([])
  const [years, setYears] = useState<BaseFipeResponse[]>([])
  normalizeTypeName
  // fetching states
  const [fetchingBrands, setFetchingBrands] = useState(true)
  const [fetchingPrice, setFetchingPrice] = useState(false)
  const [fetchingModels, setFetchingModels] = useState(false)
  // selectedvalues
  const [selectedBrand, setSelectedBrand] = useState<string>("")
  const [selectedModel, setSelectedModel] = useState<string>("")
  const [selectedYear, setSelectedYear] = useState<string>("")
  const allSelected = selectedBrand && selectedModel && selectedYear
  // resultado da busca
  const [result, setResult] = useState<VehicleResult>()
  // TODO: usar ReactQuery pra cache se der tempo
  // TODO: usar parametros da URL

  // buscar marcas quando o componente renderizar
  useEffect(() => {
    fetchVehicleBrands(type)
      .then((res) => {
        if (res.status === 200) {
          const responseData = res.data as BaseFipeResponse[]
          setBrands(responseData)
        } else {
          toast.error(`Erro ao buscar ${type}.`)
        }
      })
      .catch(() => {
        toast.error("Erro ao buscar ${type}.")
      })
      .finally(() => setFetchingBrands(false))
  }, [type])

  // buscar modelos e anos quando o usuário selecionar uma marca
  useEffect(() => {
    // não rodar na primeira renderização
    if (selectedBrand === "") { return }

    setFetchingModels(true)
    fetchVehicleModels(type, selectedBrand)
      .then((res) => {
        if (res.status === 200) {
          const responseData = res.data as BrandInfo
          setModels(responseData.modelos)
          setYears(responseData.anos)
        } else {
          toast.error("Erro ao buscar modelos.")
        }
      })
      .catch(() => {
        toast.error("Erro ao buscar modelos.")
      })
      .finally(() => setFetchingModels(false))
  }, [type, selectedBrand])

  function submitSearch() {
    if (!(selectedBrand && selectedModel && selectedYear)) {
      toast.error("Selecione marca, modelo e ano.")
      return
    }

    setFetchingPrice(true)
    fetchVehicleValue(type, selectedBrand, selectedModel, selectedYear)
      .then((res) => {
        toast.success("Carro encontrado")
        const responseData = res.data as VehicleResult
        console.log(responseData)
        setResult(responseData)
      })
      .catch(() => {
        toast.error("Erro ao buscar carro")
      })
      .finally(() => {
        setFetchingPrice(false)
      })

  }

  // selecionar marca do carro e remover seleção atual de modelo e ano
  function selectBrandAndClear(val: string) {
    setSelectedBrand(val)
    setSelectedModel("")
    setSelectedYear("")
  }

  return (
    <div className="flex flex-col max-w-xl w-5/6 gap-6 mx-auto">
      <Select onValueChange={selectBrandAndClear} value={selectedBrand}>
        <SelectTrigger className="">
          <SelectValue placeholder="Marca" />
        </SelectTrigger>
        <SelectContent>
          {fetchingBrands &&
            <div className="w-full flex items-center py-1">
              <span className="mx-auto">
                <Spinner />
              </span>
            </div>
          }
          {!fetchingBrands &&
            brands.map((brand) => (
              <SelectItem key={brand.codigo} value={brand.codigo}>
                {brand.nome}
              </SelectItem>
            ))
          }
        </SelectContent>
      </Select>

      {selectedBrand &&
        <Select onValueChange={setSelectedModel} value={selectedModel}>
          <SelectTrigger className="">
            <SelectValue placeholder="Modelo" />
          </SelectTrigger>
          <SelectContent>
            {fetchingModels &&
              <div className="w-full flex items-center py-1">
                <span className="mx-auto">
                  <Spinner />
                </span>
              </div>
            }
            {!fetchingModels &&
              models.map((car) => (
                <SelectItem key={car.codigo} value={car.codigo}>
                  {car.nome}
                </SelectItem>
              ))
            }
          </SelectContent>
        </Select>
      }

      {selectedBrand &&
        <Select onValueChange={setSelectedYear} value={selectedYear}>
          <SelectTrigger className="">
            <SelectValue placeholder="Ano" />
          </SelectTrigger>
          <SelectContent>
            {fetchingModels &&
              <div className="w-full flex items-center py-1">
                <span className="mx-auto">
                  <Spinner />
                </span>
              </div>
            }
            {!fetchingModels &&
              years.map((year) => (
                <SelectItem key={year.codigo} value={year.codigo}>
                  {year.nome}
                </SelectItem>
              ))
            }
          </SelectContent>
        </Select>
      }

      {allSelected &&
        <Button
          disabled={fetchingPrice}
          onClick={submitSearch}
          className="bg-indigo-500 w-full max-w-64 mx-auto"
        >
          {fetchingPrice && <Spinner />}
          {!fetchingPrice && "Buscar"}

        </Button>
      }

      {result &&
        <VehicleCard vehicle={result} />
      }
    </div>
  )
}


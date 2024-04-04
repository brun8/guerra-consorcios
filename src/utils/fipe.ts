import axios from "axios"

import type { VehicleType } from "@/types/fipe"


const fipe = axios.create({
  baseURL: "https://parallelum.com.br/fipe/api/v1",
})


export function fetchVehicleBrands(type: VehicleType) {
  return fipe.get(`/${type}/marcas`)
}

export function fetchVehicleModels(type: VehicleType, code: string) {
  return fipe.get(`/${type}/marcas/${code}/modelos`)
}

export function fetchVehicleValue(
  type: VehicleType,
  brandCode: string,
  modelCode: string,
  yearCode: string
) {
  return fipe.get(`/${type}/marcas/${brandCode}/modelos/${modelCode}/anos/${yearCode}`)
}

// coloca o acento só se for caminhões
export function normalizeTypeName(type: VehicleType) {
  type === "caminhoes" ? "caminhões" : type
}


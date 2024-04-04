export type VehicleType = "carros" | "motos" | "caminhoes"

export type BaseFipeResponse = {
    codigo: string,
    nome: string,
}

export type BrandInfo = {
    anos: BaseFipeResponse[],
    modelos: BaseFipeResponse[],
}

export type VehicleResult = {
    AnoModelo: number,
    CodigoFipe: string,
    Combustivel: string,
    Marca: string,
    MesReferencia: string,
    Modelo: string,
    SiglaCombustivel: string,
    TipoVeiculo: number,
    Valor: string,
}


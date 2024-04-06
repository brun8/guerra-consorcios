import { Layout } from "@/components/layout";
import { SaleList } from "@/components/sale-list";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { VehicleSearch } from "@/components/vehicle-search";


export default function CarsPage() {
  return (
    <Layout>
      <div className="mt-8 flex justify-center pb-6">
        <Tabs defaultValue="search" className="w-full flex flex-col gap-4">
          <TabsList className="mx-auto">
            <TabsTrigger value="search">Buscar</TabsTrigger>
            <TabsTrigger value="market">Carros à venda</TabsTrigger>
          </TabsList>
          <TabsContent value="search">
            <div className="text-neutral-500 text-center mb-2">
              <p>
                Busque um carro para listá-lo para venda.
              </p>
            </div>
            <div className="w-full">
              <VehicleSearch type="carros" />
            </div>
          </TabsContent>
          <TabsContent value="market">
            <SaleList type="carros" />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>

  )
}


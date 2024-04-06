import { Layout } from "@/components/layout";
import { SaleList } from "@/components/sale-list";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { VehicleSearch } from "@/components/vehicle-search";


export default function BikesPage() {
  return (
    <Layout title="Motos">
      <div className="mt-8 flex justify-center pb-6">
        <Tabs defaultValue="search" className="w-full flex flex-col gap-4">
          <TabsList className="mx-auto">
            <TabsTrigger value="search">Buscar</TabsTrigger>
            <TabsTrigger value="market">Motos à venda</TabsTrigger>
          </TabsList>
          <TabsContent value="search">
            <div className="text-neutral-500 text-center mb-2">
              <p>
                Busque uma moto para listá-la para venda.
              </p>
            </div>
            <div className="w-full">
              <VehicleSearch type="motos" />
            </div>
          </TabsContent>
          <TabsContent value="market">
            <div className="max-w-5xl mx-auto">
              <SaleList type="motos" />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>

  )
}


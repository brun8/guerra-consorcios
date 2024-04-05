import { Layout } from "@/components/layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { VehicleSearch } from "@/components/vehicle-search";

export default function BikesPage() {
  return (
    <Layout>
      <div className="mt-8 flex justify-center pb-6">
        <Tabs defaultValue="search" className="w-full flex flex-col gap-4">
          <TabsList className="mx-auto">
            <TabsTrigger value="search">Buscar e vender</TabsTrigger>
          </TabsList>
          <TabsContent value="search">
            <div className="w-full">
              <VehicleSearch type="carros" />
            </div>
          </TabsContent>
          <TabsContent value="market"></TabsContent>
        </Tabs>
      </div>
    </Layout>

  )
}


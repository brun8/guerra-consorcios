import { Navbar } from "@/components/navbar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { VehicleSearch } from "@/components/vehicleSearch";


export default function CarsPage() {
  return (
    <main className="min-h-screen space-y-6 pb-6">
      <Navbar />
      <div className="flex justify-center">
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

    </main >
  )
}


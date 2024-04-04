import { Navbar } from "@/components/navbar";
import { VehicleSearch } from "@/components/vehicleSearch";


export default function CarsPage() {
  return (
    <main className="min-h-screen space-y-6 pb-6">
      <Navbar />
      <VehicleSearch type="motos" />
    </main >
  )
}


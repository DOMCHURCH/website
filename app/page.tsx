import { Loader } from "@/components/ui/Loader";
import { Cursor } from "@/components/ui/Cursor";
import { Nav } from "@/components/sections/Nav";
import { Hero } from "@/components/sections/Hero";
import { OriginTicker } from "@/components/sections/OriginTicker";
import { FeaturedRoasts } from "@/components/sections/FeaturedRoasts";
import { Process } from "@/components/sections/Process";
import { CafeLocations } from "@/components/sections/CafeLocations";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <Loader />
      <Cursor />
      <div className="grain" aria-hidden="true" />
      <Nav />
      <main>
        <Hero />
        <OriginTicker />
        <FeaturedRoasts />
        <Process />
        <CafeLocations />
      </main>
      <Footer />
    </>
  );
}

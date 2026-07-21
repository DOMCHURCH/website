import { Loader } from "@/components/ui/Loader";
import { Cursor } from "@/components/ui/Cursor";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { FrameSequence } from "@/components/ui/FrameSequence";
import { Nav } from "@/components/sections/Nav";
import { Hero } from "@/components/sections/Hero";
import { BotanicalTicker } from "@/components/sections/BotanicalTicker";
import { Collections } from "@/components/sections/Collections";
import { Glasshouse } from "@/components/sections/Glasshouse";
import { Visit } from "@/components/sections/Visit";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <Loader />
      <Cursor />
      <ScrollProgress />

      {/* Scroll-scrubbed greenhouse background (fixed, z-0) */}
      <FrameSequence />

      <Nav />

      {/* Everything overlays the background */}
      <div className="relative z-10">
        <main>
          <Hero />
          <BotanicalTicker />
          <Collections />
          <Glasshouse />
          <Visit />
        </main>
        <Footer />
      </div>
    </>
  );
}

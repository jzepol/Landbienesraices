import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";
import About from "@/components/home/About";
import PropertyGrid from "@/components/home/PropertyGrid";
import Contact from "@/components/home/Contact";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const propiedades = await prisma.propiedad.findMany({
    where: { estado: true },
    orderBy: { creadoEn: "desc" },
  });

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <PropertyGrid propiedades={propiedades} />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
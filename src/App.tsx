import { Navbar, Footer } from "@/components/layout";
import { Hero, Stats, About, CompaniesExpanding, Careers, News, Contact } from "@/components/sections";

export default function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <About />
        <CompaniesExpanding />
        <Careers />
        <News />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

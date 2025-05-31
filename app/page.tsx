import Navbar from "@/components/navbar"
import Hero from "@/components/hero"
import Tools from "@/components/tools"
import Projects from "@/components/projects"
import Certifications from "@/components/certifications"
import Contact from "@/components/contact"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <section id="about" className="py-16">
          <Hero />
        </section>

        <section id="tools" className="py-16">
          <Tools />
        </section>

        <section id="projects" className="py-16">
          <Projects />
        </section>

        <section id="certifications" className="py-16">
          <Certifications />
        </section>

        <section id="contact" className="py-16">
          <Contact />
        </section>
      </main>
      <Footer />
    </div>
  )
}


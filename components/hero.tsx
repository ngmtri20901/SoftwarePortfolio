import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Hero() {
  return (
    <div className="flex flex-col items-start gap-4">
      <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
        Hi, I'm <span className="text-primary">Your Name</span>
      </h1>
      <h2 className="text-2xl font-medium text-muted-foreground">Generalist Software Developer</h2>
      <p className="max-w-[700px] text-lg text-muted-foreground">
        I'm a versatile software developer with expertise across multiple domains. I enjoy solving complex problems and
        building elegant, user-friendly applications. My approach combines technical knowledge with creative thinking to
        deliver solutions that exceed expectations.
      </p>
      <div className="flex gap-4">
        <Button asChild>
          <Link href="#contact">Get in touch</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="#projects">View my work</Link>
        </Button>
      </div>
    </div>
  )
}


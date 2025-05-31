import Link from "next/link"

export default function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <div className="text-center md:text-left">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Your Name. All rights reserved.
          </p>
        </div>
        <div className="flex gap-4">
          <Link href="#" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
            Privacy Policy
          </Link>
          <Link href="#" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  )
}


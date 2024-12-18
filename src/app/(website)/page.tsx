import { FAQs } from "@/components/faqs"
import { Footer } from "@/components/footer"
import { Pricing } from "@/components/pricing"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"

export default function Home() {
  return (
    <main>
      <nav className="border-b">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/" className="text-xl font-semibold">
              Logo
            </Link>
            <div className="hidden md:flex gap-6">
              <Link href="/" className="text-sm font-medium text-muted-foreground hover:text-foreground">
                Home Page
              </Link>
              <Link href="/features" className="text-sm font-medium text-muted-foreground hover:text-foreground">
                Features
              </Link>
              <Link href="/pricing" className="text-sm font-medium text-muted-foreground hover:text-foreground">
                Pricing
              </Link>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Link href={"/dashboard"}>
              <Button variant="ghost" size="sm">
                Sign Up
              </Button>
            </Link>
            <Link href={"/dashboard"}>
              <Button size="sm">Try For Free</Button>
            </Link>
          </div>
        </div>
      </nav>

      <section className="py-12 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-8 text-center">
            <div className="space-y-4 max-w-3xl">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                Automate Your Instagram Marketing Effortlessly
              </h1>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Stop spending your Instagram marketing time on repetitive processes and interactions, allowing you to
                focus on what truly matters - growing your brand. Experience the power of automation and watch your
                engagement soar.
              </p>
            </div>
            <div className="flex flex-col gap-4 min-[400px]:flex-row">
              <Link href={"/dashboard"}>
                <Button size="lg">Get Started For Free</Button>
              </Link>
              <Link href={"/dashboard"}>
                <Button variant="outline" size="lg">
                  Sign Up
                </Button>
              </Link>
            </div>
            <div className="w-full max-w-5xl">
              <div className="aspect-video overflow-hidden rounded-lg bg-muted">
                <Image
                  src="/placeholder.svg"
                  alt="Instagram Automation Platform"
                  width={1920}
                  height={1080}
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <Pricing />
      <FAQs />
      <Footer />
    </main>
  )
}

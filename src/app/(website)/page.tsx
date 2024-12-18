import FAQs from "@/components/faqs"
import Footer from "@/components/footer"
import Pricing from "@/components/pricing"
import { Button } from "@/components/ui/button"
import { LogoSmall } from "@/svgs/logo-small"
import Image from "next/image"
import Link from "next/link"

export default function Home() {
  return (
    <main>
      <nav className="border-b">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/" className="text-xl font-semibold">
                    <div className="flex gap-x-2 items-center p-0 justify-center">
                      <LogoSmall />
                    </div>
            </Link>
            <div className="hidden md:flex gap-6">
              <Link href="/" className="text-sm font-medium text-muted-foreground hover:text-foreground">
                Home
              </Link>
              <Link href="/" className="text-sm font-medium text-muted-foreground hover:text-foreground">
                Features
              </Link>
              <Link href="/" className="text-sm font-medium text-muted-foreground hover:text-foreground">
                Pricing
              </Link>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Link href={"/sign-up"}>
              <Button variant="ghost" size="sm">
                Sign Up
              </Button>
            </Link>
            <Link href={"/sign-in"}>
              <Button size="sm">Sign In</Button>
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
            <div className="relative group mt-14">
              <div className="absolute top-2 lg:-top-8 left-1/2 transform -translate-x-1/2 w-[90%] mx-auto h-24 lg:h-80 bg-primary/50 rounded-full blur-3xl"></div>
              <Image
                width={1200}
                height={1200}
                className="w-full md:w-[1200px] mx-auto rounded-lg relative rouded-lg leading-none flex items-center border border-t-2 border-secondary  border-t-primary/30"
                src={"/placeholder.png"}
                alt="dashboard"
              />

              <div className="absolute bottom-0 left-0 w-full h-20 md:h-28 bg-gradient-to-b from-background/0 via-background/50 to-background rounded-lg"></div>
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

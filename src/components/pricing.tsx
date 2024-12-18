import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"

const plans = [
  {
    name: "Basic",
    price: "$9.99",
    features: ["100 automated posts per month", "Basic analytics", "24/7 email support", "Single user account"]
  },
  {
    name: "Pro",
    price: "$19.99",
    features: [
      "Unlimited automated posts",
      "Advanced analytics and reporting",
      "Priority 24/7 support",
      "Custom scheduling",
      "Multiple user accounts",
      "API access"
    ]
  }
]

export function Pricing() {
  return (
    <section className="py-12 md:py-24 bg-gray-50">
      <div className="container px-4 md:px-6">
        <h2 className="text-3xl font-bold text-center mb-12">Choose Your Plan</h2>
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {plans.map((plan) => (
            <div key={plan.name} className="flex flex-col p-6 bg-white rounded-lg shadow-lg">
              <h3 className="text-xl font-bold mb-4">{plan.name}</h3>
              <p className="text-3xl font-bold mb-6">
                {plan.price}
                <span className="text-sm font-normal">/month</span>
              </p>
              <ul className="mb-6 flex-grow">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center mb-2">
                    <Check className="mr-2 h-5 w-5 text-green-500" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Button className="w-full">Get Started</Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

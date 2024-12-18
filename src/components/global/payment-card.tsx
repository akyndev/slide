"use client"
import { Button } from "@/components/ui/button"
import { PLANS } from "@/constants"
import { useSubscription } from "@/hooks/use-subscription"
import { cn } from "@/lib/utils"
import { CircleCheck } from "lucide-react"

type Props = {
  label: string
  current: "pro" | "free"
  landing?: boolean
}

const PaymentCard = ({ current, label, landing }: Props) => {

  const { onSubscribe } = useSubscription()

  return (
    <div
      className={cn(
        label !== current ? "bg-in-active" : "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500",
        "p-[2px] rounded-xl overflow-hidden"
      )}
    >
      <div
        className={cn(
          landing && "radial--gradient--pink",
          "flex flex-col rounded-xl pl-5 py-5 pr-10 bg-background-90 h-full"
        )}
      >
        {landing ? (
          <h2 className="text-2xl">
            {label === "pro" && "Premium Plan"}
            {label === "free" && "Standard"}
          </h2>
        ) : (
          <h2 className="text-2xl">
            {label === current ? "Your Current Plan" : current === "pro" ? "Downgrade" : "Upgrade"}
          </h2>
        )}
        <p className="text-text-secondary text-sm mb-2">
          This is what your plan covers for automations and Ai features
        </p>
        {label === "pro" ? (
          <span className="bg-gradient-to-r text-3xl from-indigo-500 via-purple-500 font-bold to-pink-500 bg-clip-text text-transparent">
            Smart AI
          </span>
        ) : (
          <p className="font-bold mt-2 text-text-secondary">Standard</p>
        )}
        {label === "pro" ? (
          <p className="mb-2">
            <b className="text-xl">$99</b>/month
          </p>
        ) : (
          <p className="text-xl mb-2">Free</p>
        )}

        {PLANS[label === "pro" ? 1 : 0].features.map((i) => (
          <p key={i} className="mt-2 text-muted-foreground flex gap-2 ">
            <CircleCheck className="text-indigo-500" />
            {i}
          </p>
        ))}

        {landing ? (
          <Button
            className={cn(
              "rounded-full mt-5",
              label === "pro"
                ? "bg-gradient-to-r from-indigo-500 text-white via-purple-500 to-pink-500"
                : "bg-background-80 text-white hover:text-background-80"
            )}
          >
            {label === current ? "Get Started" : current === "pro" ? "Free" : "Get Started"}
          </Button>
        ) : (
          <Button
            className="rounded-full mt-5 bg-background-80 text-white hover:text-background-80"
              disabled={label === current}
              onClick={onSubscribe}
          >
            {label === current ? "Active" : current === "pro" ? "Downgrade" : "Upgrade"}
          </Button>
        )}
      </div>
    </div>
  )
}

export default PaymentCard

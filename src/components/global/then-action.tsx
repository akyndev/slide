"use client"
import { saveListener } from "@/actions/automations"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { AUTOMATION_LISTENERS, AutomationListenerProps } from "@/constants"
import { cn } from "@/lib/utils"
import { FormEvent, useState } from "react"
import { Button } from "../ui/button"
import Loader from "./loader"
import { SubscriptionPlan } from "./subscription-plan"
import TriggerButton from "./trigger-button"

type Props = {
  id: string
}

const ThenAction = ({ id }: Props) => {
  const [listener, setListener] = useState<"message" | "smart_ai" | null>(null)
  const [loading, setLoading] = useState(false)

  async function createListener(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    const form = e.target as HTMLFormElement
    const formData = new FormData(form)
    const prompt = formData.get("prompt") as string
    const reply = formData.get("reply") as string
    await saveListener(id, listener || "message", prompt, reply)
    setLoading(false)
  }

  return (
    <TriggerButton label="Then">
      <div className="flex flex-col gap-y-2 ">
        {AUTOMATION_LISTENERS.map((listen: AutomationListenerProps) =>
          listen.type === "smart_ai" ? (
            <SubscriptionPlan key={listen.type} type="pro">
              <div
                onClick={() => setListener(listen.type)}
                key={listen.id}
                className={cn(
                  listener === listen.type ? "bg-gradient-to-br from-[#3352CC] to-[#1C2D70]" : "bg-background-80",
                  "p-3 rounded-xl flex flex-col gap-y-2 cursor-pointer hover:opacity-80 transition duration-100"
                )}
              >
                <div className="flex gap-x-2 items-center">
                  {listen.icon}
                  <p>{listen.label}</p>
                </div>
                <p>{listen.description}</p>
              </div>
            </SubscriptionPlan>
          ) : (
            <div
              onClick={() => setListener(listen.type)}
              key={listen.id}
              className={cn(
                listener === listen.type ? "bg-gradient-to-br from-[#3352CC] to-[#1C2D70]" : "bg-background-80",
                "p-3 rounded-xl flex flex-col gap-y-2 cursor-pointer hover:opacity-80 transition duration-100"
              )}
            >
              <div className="flex gap-x-2 items-center">
                {listen.icon}
                <p>{listen.label}</p>
              </div>
              <p>{listen.description}</p>
            </div>
          )
        )}
        <form onSubmit={createListener} className="flex flex-col gap-y-2">
          <Textarea
            placeholder={
              listener === "smart_ai"
                ? "Add a prompt that your smart ai can use..."
                : "Add a message you want send to your customers"
            }
            name="prompt"
            id="prompt"
            className="bg-background-80 outline-none border-none ring-0 focus:ring-0"
          />
          <Input
            name="reply"
            id="reply"
            placeholder="Add a reply for comments (Optional)"
            className="bg-background-80 outline-none border-none ring-0 focus:ring-0"
          />
          <Button type="submit" className="bg-gradient-to-br w-full from-[#3352CC] font-medium text-white to-[#1C2D70]">
            <Loader state={loading}>Add listener</Loader>
          </Button>
        </form>
      </div>
    </TriggerButton>
  )
}

export default ThenAction

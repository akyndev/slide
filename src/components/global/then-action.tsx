import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { AUTOMATION_LISTENERS } from "@/constants"
import { useListener } from "@/hooks/use-automations"
import { cn } from "@/lib/utils"
import Loader from "./loader"
import { SubscriptionPlan } from "./subscription-plan"
import TriggerButton from "./trigger-button"

type Props = {
  id: string
}

const ThenAction = ({ id }: Props) => {
  const { onSetListener, listener, onFormSubmit, register, isPending } = useListener(id)

  return (
    <TriggerButton label="Then">
      <div className="flex flex-col gap-y-2 ">
        {AUTOMATION_LISTENERS.map((listen) =>
          listen.type === "smart_ai" ? (
            <SubscriptionPlan key={listen.type} type="pro">
              <div
                onClick={() => onSetListener(listen.type)}
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
              onClick={() => onSetListener(listen.type)}
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
        <form onSubmit={onFormSubmit} className="flex flex-col gap-y-2">
          <Textarea
            placeholder={
              listener === "smart_ai"
                ? "Add a prompt that your smart ai can use..."
                : "Add a message you want send to your customers"
            }
            {...register("prompt")}
            className="bg-background-80 outline-none border-none ring-0 focus:ring-0"
          />
          <Input
            {...register("reply")}
            placeholder="Add a reply for comments (Optional)"
            className="bg-background-80 outline-none border-none ring-0 focus:ring-0"
          />
          <Button type="submit" className="bg-gradient-to-br w-full from-[#3352CC] font-medium text-white to-[#1C2D70]">
            <Loader state={isPending}>Add listener</Loader>
          </Button>
        </form>
      </div>
    </TriggerButton>
  )
}

export default ThenAction

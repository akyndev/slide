"use client"

import { AUTOMATION_TRIGGERS } from "@/constants"
import { useTriggers } from "@/hooks/use-automations"
import { useQueryAutomation } from "@/hooks/user-queries"
import { cn } from "@/lib/utils"
import { useAppSelector } from "@/redux/automation-slice"
import { Button } from "../ui/button"
import { Separator } from "../ui/separator"
import ActiveTrigger from "./active"
import Keywords from "./keywords"
import Loader from "./loader"
import ThenAction from "./then-action"
import TriggerButton from "./trigger-button"

type Props = {
  id: string
}

const Trigger = ({ id }: Props) => {
  const { onSaveTrigger, isPending, onSetTrigger } = useTriggers(id)
  const { data } = useQueryAutomation(id)
  const types = useAppSelector((state) => state.automation.trigger.types)

  if (data?.data && data.data?.triggers.length > 0) {
    return (
      <div className="flex flex-col ga-y-6 items-center">
        <ActiveTrigger type={data.data.triggers[0].type as string} keywords={data.data.keywords} />

        {data?.data?.triggers.length > 1 ? (
          <>
            <div className="relative w-6/12 my-4">
              <p className="absolute transform  px-2 -translate-y-1/2 top-1/2 -translate-x-1/2 left-1/2">or</p>
              <Separator className="border-muted border-[1px]" />
            </div>
            <ActiveTrigger type={data.data.triggers[1].type as string} keywords={data.data.keywords} />
          </>
        ) : null}
        {!data.data.listener ? <ThenAction id={id} /> : null}
      </div>
    )
  }

  return (
    <TriggerButton label="Add Trigger">
      <div className="flex flex-col gap-y-2">
        {AUTOMATION_TRIGGERS.map((trigger) => (
          <div
            key={trigger.id}
            onClick={() => onSetTrigger(trigger.type)}
            className={cn(
              "hover:opacity-80 text-white rounded-xl flex cursor-pointer flex-col p-3 gap-y-2",
              !types?.find((t) => t === trigger.type)
                ? "bg-background-80"
                : "bg-gradient-to-br from-[#3352CC] font-medium to-[#1C2D70]"
            )}
          >
            <div className="flex gap-x-2 items-center">
              {trigger.icon}
              <p className="font-bold">{trigger.label}</p>
            </div>
            <p className="text-sm font-light">{trigger.description}</p>
          </div>
        ))}
        <Keywords id={id} />
        <Button
          onClick={() => onSaveTrigger(types!)}
          disabled={types?.length === 0}
          className="bg-gradient-to-br from-[#3352CC] font-medium text-white to-[#1C2D70]"
        >
          <Loader state={isPending}>Create Trigger</Loader>
        </Button>
      </div>
    </TriggerButton>
  )
}

export default Trigger

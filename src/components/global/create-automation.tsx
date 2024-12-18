"use client"

import { Button } from "@/components/ui/button"
import { useCreateAutomation } from "@/hooks/use-automations"
import { AutomationDuoToneWhite } from "@/icons"
import Loader from "./loader"
import { v4 } from 'uuid'
type Props = {}

const CreateAutomation = (props: Props) => {
  const mutationId = v4()

  const { isPending, mutate } = useCreateAutomation()

  return (
    <Button
      className="lg:px-10 py-6 bg-gradient-to-br hover:opacity-80 text-white rounded-full from-[#3352CC] font-medium to-[#1C2D70]"
      onClick={() =>
        mutate({
          name: "Untitled",
          id: mutationId,
          createdAt: new Date(),
          keywords: []
        })
      }
    >
      <Loader state={isPending}>
        <div className="flex items-center gap-x-2">
          <AutomationDuoToneWhite />
          <p className="lg:inline hidden">Create an Automation</p>
        </div>
      </Loader>
    </Button>
  )
}

export default CreateAutomation

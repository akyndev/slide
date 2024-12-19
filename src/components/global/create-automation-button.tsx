"use client"
import { Button } from "@/components/ui/button"
import { AutomationDuoToneWhite } from "@/icons"
import { useFormStatus } from "react-dom"
import Loader from "./loader"

const CreateAutomationButton = () => {
  const { pending } = useFormStatus()
  return (
    <Button
      className="lg:px-10 py-6 bg-gradient-to-br hover:opacity-80 text-white rounded-full from-[#3352CC] font-medium to-[#1C2D70]"
          type="submit"
          disabled={pending}
    >
      <Loader state={pending}>
        <div className="flex items-center gap-x-2">
          <AutomationDuoToneWhite />
          <p className="lg:inline hidden">Create an Automation</p>
        </div>
      </Loader>
    </Button>
  )
}

export default CreateAutomationButton

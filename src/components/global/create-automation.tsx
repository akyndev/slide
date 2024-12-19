"use client"

import { createAutomation } from "@/actions/automations"
import CreateAutomationButton from "./create-automation-button"

type Props = {}

const CreateAutomation = (props: Props) => {
  return (
    <form action={createAutomation}>
      <CreateAutomationButton />
    </form>
  )
}

export default CreateAutomation

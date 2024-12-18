import { duplicateValidation } from "@/lib/utils"
import { createStore } from "zustand"
import { subscribeWithSelector } from "zustand/middleware"

export type AutomationState = {
  trigger: {
    type?: "COMMENT" | "DM"
    keyword?: string
    types?: string[]
    keywords?: string[]
  }
}

export type AutomationActions = {
  triggerFn: (type?: "COMMENT" | "DM") => void
}

export type AutomationStore = AutomationState & AutomationActions

export const defaultInitState: AutomationState = {
  trigger: {
    type: undefined,
    keyword: undefined,
    types: [],
    keywords: []
  }
}

export const automationStore = (initState: AutomationState = defaultInitState) => {
  return createStore<AutomationStore>()(
    subscribeWithSelector((set) => ({
      ...initState,
      triggerFn: (type?: "COMMENT" | "DM") =>
        set((state) => {
          state.trigger.types = duplicateValidation(state.trigger.types!, type!)
          console.log(state.trigger.types)
          return state
        })
    }))
  )
}

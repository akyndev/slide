"use client"

import { type ReactNode, createContext, useContext, useRef } from "react"
import { useStore } from "zustand"

import { type AutomationStore, automationStore } from "@/zustand/store"

export type AutomationStoreApi = ReturnType<typeof automationStore>

export const AutomationStoreContext = createContext<AutomationStoreApi | undefined>(undefined)

export interface AutomationStoreProviderProps {
  children: ReactNode
}

export const AutomationStoreProvider = ({ children }: AutomationStoreProviderProps) => {
  const storeRef = useRef<AutomationStoreApi>()
  if (!storeRef.current) {
    storeRef.current = automationStore()
  }

  return <AutomationStoreContext.Provider value={storeRef.current}>{children}</AutomationStoreContext.Provider>
}

export const useAutomationStore = <T,>(selector: (store: AutomationStore) => T): T => {
  const automationStoreContext = useContext(AutomationStoreContext)

  if (!automationStoreContext) {
    throw new Error(`useAutomationStore must be used within AutomationStoreProvider`)
  }

  return useStore(automationStoreContext, selector)
}

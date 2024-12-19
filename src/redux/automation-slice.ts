import { duplicateValidation } from "@/lib/utils"
import type { PayloadAction } from "@reduxjs/toolkit"
import { createSlice } from "@reduxjs/toolkit"
import { useDispatch, useSelector } from "react-redux"
import type { AppDispatch, RootState } from "./store"

export type AutomationState = {
  trigger: {
    type?: "COMMENT" | "DM"
    types?: string[]
    keywords?: string[]
    keyword?: string
  }
}

const initialState: AutomationState = {
  trigger: {
    type: undefined,
    types: [],
    keyword: undefined,
    keywords: []
  }
}

export const automationSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    triggerFn: (state, action: PayloadAction<"COMMENT" | "DM">) => {
      state.trigger.types = duplicateValidation(state.trigger.types!, action.payload)
      return state
    }
  }
})

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()

export const { triggerFn } = automationSlice.actions

export default automationSlice.reducer

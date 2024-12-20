"use client"
import { deleteKeyword, saveKeyword, saveListener, saveTrigger, updateAutomationName } from "@/actions/automations"
import { createAutomation } from "@/actions/automations/queries"
import { triggerFn, useAppDispatch } from "@/redux/automation-slice"
import { useEffect, useRef, useState } from "react"
import { z } from "zod"
import { useMutationData } from "./use-mutation-data"
import { useZodForm } from "./use-zod-form"

export const useCreateAutomation = () => {
  const { isPending, mutate } = useMutationData(["create-automation"], () => createAutomation(), "user-automations")

  return { isPending, mutate }
}

export const useEditAutomation = (automationId: string) => {
  const [edit, setEdit] = useState(false)
  const inputRef = useRef<HTMLInputElement | null>(null)
  const enableEdit = () => setEdit(true)
  const disableEdit = () => setEdit(false)

  const { isPending, mutate } = useMutationData(
    ["update-automation"],
    (data: { name: string }) => updateAutomationName(automationId, { name: data.name }),
    "automation-info",
    disableEdit
  )

  useEffect(() => {
    function handleClickOutside(this: Document, event: MouseEvent) {
      if (inputRef.current && !inputRef.current.contains(event.target as Node | null)) {
        if (inputRef.current.value !== "") {
          mutate({ name: inputRef.current.value })
        } else {
          disableEdit()
        }
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  })

  return {
    edit,
    enableEdit,
    disableEdit,
    inputRef,
    isPending
  }
}



export const useTriggers = (id: string) => {
  const dispatch = useAppDispatch()
  const onSetTrigger = (type: "COMMENT" | "DM") => dispatch(triggerFn(type))

  const { isPending, mutate } = useMutationData(
    ["add-trigger"],
    (data: { types: string[] }) => saveTrigger(id, data.types),
    "automation-info"
  )

  const onSaveTrigger = (types: string[]) => mutate({ types })
  return { onSetTrigger, onSaveTrigger, isPending }
}

export const useKeywords = (id: string) => {
  const [keyword, setKeyword] = useState("")
  const onValueChange = (e: React.ChangeEvent<HTMLInputElement>) => setKeyword(e.target.value)

  const { mutate } = useMutationData(
    ["add-keyword"],
    (data: { keyword: string }) => saveKeyword(id, data.keyword),
    "automation-info",
    () => setKeyword("")
  )

  const onKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      mutate({ keyword })
      setKeyword("")
    }
  }

  const { mutate: deleteMutation } = useMutationData(
    ["delete-keyword"],
    (data: { id: string }) => deleteKeyword(data.id),
    "automation-info"
  )

  return { keyword, onValueChange, onKeyPress, deleteMutation }
}

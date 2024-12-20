import { getAllAutomations, getAutomationInfo, getProfilePosts, savePosts } from "@/actions/automations"
import { onBoardUser, onUserInfo } from "@/actions/user"
import { changeMediaType } from "@/lib/utils"
import { useQuery } from "@tanstack/react-query"
import { useState } from "react"
import { useMutationData } from "./use-mutation-data"

export const useQueryUser = () => {
  return useQuery({
    queryKey: ["user-info"],
    queryFn: onUserInfo
  })
}


export const useQueryAutomations = () => {
  return useQuery({
    queryKey: ["user-automations"],
    queryFn: getAllAutomations
  })
}

export const useQueryAutomation = (id: string) => {
  return useQuery({
    queryKey: ["automation-info"],
    queryFn: () => getAutomationInfo(id)
  })
}

export const useQueryAutomationPosts = () => {
  const fetchPosts = async () => await getProfilePosts()
  return useQuery({
    queryKey: ["instagram-media"],
    queryFn: fetchPosts
  })
}

export const useAutomationPosts = (id: string) => {
  const [posts, setPosts] = useState<
    {
      postId: string
      caption?: string
      media: string
      mediaType: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM"
    }[]
  >([])

  const onSelectPost = (post: {
    postId: string
    caption?: string
    media: string
    mediaType: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM"
  }) => {
    setPosts((prevItems) => {
      if (prevItems.find((p) => p.postId === post.postId)) {
        return prevItems.filter((item) => item.postId !== post.postId)
      }
      return [...prevItems, post]
    })
  }

  const readyPosts = posts.map((post) => {
    return { ...post, mediaType: changeMediaType(post.mediaType) }
  })

  const { mutate, isPending } = useMutationData(
    ["attact-posts"],
    () => savePosts(id, readyPosts),
    "automation-info",
    () => setPosts([])
  )

  return { mutate, isPending, onSelectPost, posts }
}

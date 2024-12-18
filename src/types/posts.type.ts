export type InstagramPostProps = {
    id: string
    caption?: string
    media_url: string, 
    media_type: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM"
}
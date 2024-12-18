"use client"
import { Separator } from "@/components/ui/separator"
import { usePaths } from "@/hooks/user-nav"
import { HelpDuoToneWhite } from "@/icons"
import { LogoSmall } from "@/svgs/logo-small"
import ClerkAuthState from "../clerk-auth-state"
import { SubscriptionPlan } from "../subscription-plan"
import Items from "./items"
import UpgradeCard from "./upgrade"

type Props = {
  slug: string
}

const Sidebar = ({ slug }: Props) => {
  const { pages } = usePaths()

  return (
    <div
      className="w-[250px] 
    border-[1px]
    radial 
    fixed 
    left-0 
    lg:inline-block
    border-[#545454] 
    bg-gradient-to-b from-[#768BDD] 
    via-[#171717]
     to-[#768BDD] 
     hidden 
     bottom-0 
     top-0 
     m-3 
     rounded-3xl 
     overflow-hidden"
    >
      <div
        className="flex flex-col 
      gap-y-5
       w-full 
       h-full 
       p-3 
       bg-[#0e0e0e] 
       bg-opacity-90 
       bg-clip-padding 
       backdrop-filter 
       backdrop--blur__safari 
       backdrop-blur-3xl"
      >
        <div className="flex gap-x-2 items-center p-0 justify-center">
          <LogoSmall />
        </div>
        <div className="flex flex-col py-2">
          <Items page={pages} slug={slug} />
        </div>
        <div className="px-16">
          <Separator orientation="horizontal" className="bg-[#333336]" />
        </div>
        <div className="px-2 flex flex-col gap-y-3">
          <div className="flex gap-x-2">
            <ClerkAuthState />
            <p className="text-[#9B9CA0]">Profile</p>
          </div>
          <div className="flex gap-x-3">
            <HelpDuoToneWhite />
            <p className="text-[#9B9CA0]">Help</p>
          </div>
        </div>

        <SubscriptionPlan type="free">
          <div className="flex-1 flex flex-col justify-end">
            <UpgradeCard />
          </div>
        </SubscriptionPlan>
      </div>
    </div>
  )
}

export default Sidebar

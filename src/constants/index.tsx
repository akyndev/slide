import {
  AutomationDuoToneBlue,
  AutomationDuoToneWhite,
  ContactsDuoToneBlue,
  HomeDuoToneBlue,
  HomeDuoToneWhite,
  InstagramDuoToneBlue,
  PlaneBlue,
  RocketDuoToneBlue,
  RocketDuoToneWhite,
  SalesForceDuoToneBlue,
  SettingsDuoToneWhite,
  SmartAi,
  TinyInstagram
} from "@/icons"

export type AutomationListenerProps = {
  id: string
  label: string
  icon: JSX.Element
  description: string
  type: "smart_ai" | "message"
}

export type AutomationsTriggerProps = {
  id: string
  label: string
  icon: JSX.Element
  description: string
  type: "COMMENT" | "DM"
}

export type FieldProps = {
  label: string
  id: string
}

export const AUTOMATION_TRIGGERS: AutomationsTriggerProps[] = [
  {
    id: "1",
    label: "User comments on my post",
    icon: <TinyInstagram />,
    description: "Select if you want to automate comments on your post",
    type: "COMMENT"
  },
  {
    id: "2",
    label: "User sends me a DM with a keyword",
    icon: <TinyInstagram />,
    description: "Select if you want to automate DMs on your profile",
    type: "DM"
  }
]

export const AUTOMATION_LISTENERS: AutomationListenerProps[] = [
  {
    id: "1",
    label: "Send the user a MESSAGE",
    icon: <PlaneBlue />,
    description: "Enter the MESSAGE that you want to send the user.",
    type: "message"
  },
  {
    id: "2",
    label: "Let Smart AI take over",
    icon: <SmartAi />,
    description: "Tell AI about your project. (Upgrade to use this feature)",
    type: "smart_ai"
  }
]

export const DASHBOARD_CARDS = [
  {
    id: "1",
    label: "Set-up Auto Replies",
    subLabel: "Deliver a product lineup through Instagram DM",
    description: "Get products in front of your followers in as many places"
  },
  {
    id: "2",
    label: "Answer Questions with AI",
    subLabel: "Identify and respond to queries with AI",
    description: "The intention of the MESSAGE will be automatically detected"
  },
  {
    id: "3",
    label: "Answer Questions with AI",
    subLabel: "Identify and respond to queries with AI",
    description: "The intention of the MESSAGE will be automatically detected"
  }
]

type IntegrationCardProps = {
  title: string
  description: string
  icon: React.ReactNode
  strategy: "instagram" | "crm"
}

export const INTEGRATION_CARDS: IntegrationCardProps[] = [
  {
    title: "Connect Instagram",
    description: "Lorem ipsum dolor sit amet consectetur. Mauris scelerisque tincidunt ultrices",
    icon: <InstagramDuoToneBlue />,
    strategy: "instagram"
  },
  {
    title: "Connect Salesforce",
    description: "Lorem ipsum dolor sit amet consectetur. Mauris scelerisque tincidunt ultrices",
    icon: <SalesForceDuoToneBlue />,
    strategy: "crm"
  }
]

export const SIDEBAR_MENU = [
  {
    id: "1",
    label: "home",
    icon: <HomeDuoToneWhite />
  },
  {
    id: "2",
    label: "automations",
    icon: <AutomationDuoToneWhite />
  },
  {
    id: "3",
    label: "integrations",
    icon: <RocketDuoToneWhite />
  },
  {
    id: "4",
    label: "settings",
    icon: <SettingsDuoToneWhite />
  }
]

export const PAGE_BREAD_CRUMBS = ["contacts", "automations", "integrations", "settings"]

export const PAGE_ICON = {
  AUTOMATIONS: <AutomationDuoToneBlue />,
  CONTACTS: <ContactsDuoToneBlue />,
  INTEGRATIONS: <RocketDuoToneBlue />,
  SETTINGS: <SettingsDuoToneWhite />,
  HOME: <HomeDuoToneBlue />
}

export const PLANS = [
  {
    name: "Free Plan",
    description: "Perfect for getting started",
    price: "$0",
    features: [
      "Boost engagement with target responses",
      "Automate comment replies to enhance audience interaction",
      "Turn followers into customers with targeted messaging"
    ],
    cta: "Get Started"
  },
  {
    name: "Smart AI Plan",
    description: "Advanced features for power users",
    price: "$99",
    features: [
      "All features from Free Plan",
      "AI-powered response generation",
      "Advanced analytics and insights",
      "Priority customer support",
      "Custom branding options"
    ],
    cta: "Upgrade Now"
  }
]

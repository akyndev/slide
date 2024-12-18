"use client"
import { useQueryUser } from "@/hooks/user-queries"
import PaymentCard from "./payment-card"

const Billing = () => {
  const { data } = useQueryUser()
  return (
    <div className="flex lg:flex-row flex-col gap-5 w-full lg:w-10/12 xl:w-8/12 container">
      <PaymentCard current={data?.data?.subscription?.plan!} label="pro" />
      <PaymentCard current={data?.data?.subscription?.plan!} label="free" />
    </div>
  )
}

export default Billing

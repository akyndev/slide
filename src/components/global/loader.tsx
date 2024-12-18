import { cn } from '@/lib/utils'
import { Loader2 } from 'lucide-react'
import React from 'react'

type Props = {
    state: boolean
    className?: string
    children: React.ReactNode
    color?: string
}

const Loader = ({ children, className, state, color }: Props) => {
    

    if (state) return <div className={cn(className)}>
        <Loader2 className='animate-spin' color={color} />
    </div>

  return (
      <div>{children }</div>
  )
}

export default Loader
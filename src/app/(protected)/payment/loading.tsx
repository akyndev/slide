import Loader from "@/components/global/loader"

type Props = {}

const Loading = (props: Props) => {
  return (
    <div className="h-screen flex items-center justify-center">
      <Loader state>loading...</Loader>
    </div>
  )
}

export default Loading

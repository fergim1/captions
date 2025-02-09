import { Skeleton } from "@/components/ui/skeleton";


const Loading = () => {

  return (
    <div className="w-full h-[360px] gap-2 pt-8 flex flex-col justify-start items-center space-y-2">
      <Skeleton className="h-6 w-[90%]" />
      <Skeleton className="h-6 w-[90%]" />
      <Skeleton className="h-6 w-[90%]" />
      <Skeleton className="h-6 w-[90%]" />
      <Skeleton className="h-6 w-[90%]" />
      <Skeleton className="h-6 w-[90%]" />
    </div>
  )
}

export default Loading
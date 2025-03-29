// import { Skeleton } from "@/components/ui/skeleton";


// const Loading = () => {

//   return (
//     <div className="w-full h-[360px] gap-2 pt-8 flex flex-col justify-start items-center space-y-2">
//       <Skeleton className="h-6 w-[90%]" />
//       <Skeleton className="h-6 w-[90%]" />
//       <Skeleton className="h-6 w-[90%]" />
//       <Skeleton className="h-6 w-[90%]" />
//       <Skeleton className="h-6 w-[90%]" />
//       <Skeleton className="h-6 w-[90%]" />
//     </div>
//   )
// }

// export default Loading

import { Skeleton } from "@/components/ui/skeleton";

const Loading = ({ count = 6 }) => {
  return (
    <div className="w-full h-auto gap-2 pt-8 flex flex-col justify-start items-center space-y-2">
      {Array.from({ length: count }).map((_, index) => (
        <Skeleton key={index} className="h-6 w-[80%]" />
      ))}
    </div>
  );
};

export default Loading;
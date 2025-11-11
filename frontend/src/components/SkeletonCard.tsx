export default function SkeletonCard() {
  return (
    <div className="bg-[#1e3a5f]/30 backdrop-blur-sm border border-[#00CED1]/30 rounded-xl p-6 animate-pulse">
      <div className="h-6 bg-gray-700 rounded w-3/4 mb-4"></div>
      <div className="h-4 bg-gray-700 rounded w-1/2 mb-6"></div>
      <div className="flex gap-2 mb-4">
        <div className="h-3 bg-gray-700 rounded w-16"></div>
        <div className="h-3 bg-gray-700 rounded w-16"></div>
      </div>
      <div className="flex justify-between items-center">
        <div className="h-8 bg-gray-700 rounded w-20"></div>
        <div className="h-6 bg-gray-700 rounded w-24"></div>
      </div>
    </div>
  );
}

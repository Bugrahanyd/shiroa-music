export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0C0C0C]">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-[#00CED1] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-[#00CED1] text-lg">Loading...</p>
      </div>
    </div>
  );
}

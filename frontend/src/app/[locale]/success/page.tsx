"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function SuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");

  return (
    <div className="min-h-screen bg-[#0C0C0C] flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        {/* Success Icon */}
        <div className="w-24 h-24 bg-[#00CED1] rounded-full flex items-center justify-center mx-auto mb-8">
          <svg className="w-12 h-12 text-[#0C0C0C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h1 className="text-4xl font-[family-name:var(--font-orbitron)] font-black text-white mb-4">
          Purchase Successful!
        </h1>
        <p className="text-gray-400 mb-8">
          Your track has been purchased successfully. Check your dashboard to download your files and license.
        </p>

        <div className="flex flex-col gap-4">
          <Link
            href="/dashboard"
            className="bg-[#00CED1] text-[#0C0C0C] px-8 py-4 rounded-full font-bold text-lg hover:bg-[#5FE0E5] transition-colors"
          >
            Go to Dashboard
          </Link>
          <Link
            href="/tracks"
            className="border-2 border-[#00CED1] text-[#00CED1] px-8 py-4 rounded-full font-bold text-lg hover:bg-[#00CED1]/10 transition-colors"
          >
            Browse More Tracks
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0C0C0C] flex items-center justify-center"><div className="text-white">Loading...</div></div>}>
      <SuccessContent />
    </Suspense>
  );
}

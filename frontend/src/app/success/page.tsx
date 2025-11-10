import Link from "next/link";

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-brand-black flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        {/* Success Icon */}
        <div className="w-24 h-24 bg-turquoise rounded-full flex items-center justify-center mx-auto mb-8">
          <svg className="w-12 h-12 text-brand-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h1 className="text-4xl font-display font-black text-brand-white mb-4">
          Purchase Successful!
        </h1>
        <p className="text-gray-400 mb-8">
          Your track has been purchased successfully. Check your dashboard to download your files and license.
        </p>

        <div className="flex flex-col gap-4">
          <Link
            href="/dashboard"
            className="bg-turquoise text-brand-black px-8 py-4 rounded-full font-bold text-lg hover:bg-turquoise-soft transition-colors"
          >
            Go to Dashboard
          </Link>
          <Link
            href="/tracks"
            className="border-2 border-turquoise text-turquoise px-8 py-4 rounded-full font-bold text-lg hover:bg-turquoise/10 transition-colors"
          >
            Browse More Tracks
          </Link>
        </div>
      </div>
    </div>
  );
}

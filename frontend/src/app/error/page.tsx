import Link from "next/link";

export default function ErrorPage() {
  return (
    <div className="min-h-screen bg-brand-black flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        {/* Error Icon */}
        <div className="w-24 h-24 bg-red-500/20 border-4 border-red-500 rounded-full flex items-center justify-center mx-auto mb-8">
          <svg className="w-12 h-12 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>

        <h1 className="text-4xl font-display font-black text-brand-white mb-4">
          Payment Failed
        </h1>
        <p className="text-gray-400 mb-8">
          Something went wrong with your payment. Please try again or contact support if the problem persists.
        </p>

        <div className="flex flex-col gap-4">
          <Link
            href="/tracks"
            className="bg-turquoise text-brand-black px-8 py-4 rounded-full font-bold text-lg hover:bg-turquoise-soft transition-colors"
          >
            Try Again
          </Link>
          <Link
            href="/"
            className="border-2 border-turquoise text-turquoise px-8 py-4 rounded-full font-bold text-lg hover:bg-turquoise/10 transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

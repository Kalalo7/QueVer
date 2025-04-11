'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <h1 className="text-4xl font-bold text-red-500 mb-4">Something went wrong!</h1>
      <p className="text-gray-400 mb-8 max-w-md">
        We apologize for the inconvenience. An unexpected error has occurred.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={reset}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
        >
          Try again
        </button>
        <Link 
          href="/"
          className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-md transition-colors"
        >
          Return to Home
        </Link>
      </div>
    </div>
  );
}
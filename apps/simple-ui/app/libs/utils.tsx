
export function getApiUrl () {
  // If we've set a manual override, use it
  if (process.env.NEXT_PUBLIC_API_URL) return process.env.NEXT_PUBLIC_API_URL;

  // If on Vercel, use the automatic deployment URL
  if (process.env.NEXT_PUBLIC_VERCEL_URL) {
    return `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`;
  }

  // Fallback for local dev
  return 'http://localhost:3000';
};
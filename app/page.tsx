import { redirect } from 'next/navigation'

// Root "/" is handled by middleware (redirects to /en or /es)
// This component is a fallback that should rarely be hit.
export default function RootPage() {
  redirect('/en')
}

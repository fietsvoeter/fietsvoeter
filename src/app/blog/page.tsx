import { getAllPosts } from '@/lib/mdx'
import BlogClient from './BlogClient'

export const metadata = {
  title: 'Alle Fietsreviews & Koopgidsen 2026 | Fietsvoeter.nl',
  description: 'Onafhankelijke fietsreviews en koopgidsen voor wielrennen, MTB, gravel en e-bike. Getest op eigen ritten in 2026.',
}

export default async function BlogOverzichtPagina() {
  const posts = await getAllPosts()
  return <BlogClient posts={posts} />
}

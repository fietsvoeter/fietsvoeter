import Link from 'next/link'
import { PostMeta, CATEGORIES } from '@/lib/mdx'
export function BlogCard({ post }: { post: PostMeta }) {
  const cat = CATEGORIES[post.category]
  return (
    <article className="blog-card group">
      <Link href={`/blog/${post.slug}/`} className="block overflow-hidden">
        {post.featuredImage ? (
          <img src={post.featuredImage} alt={post.imageAlt||post.title} width={600} height={340} loading="lazy" className="w-full h-44 object-cover transition-transform duration-200 group-hover:scale-105"/>
        ) : (
          <div className="w-full h-44 bg-gray-100 flex items-center justify-center">
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none"><circle cx="14" cy="34" r="10" stroke="#E2001A" strokeWidth="2" fill="none"/><circle cx="34" cy="34" r="10" stroke="#E2001A" strokeWidth="2" fill="none"/><path d="M14 34L22 14l12 0L34 34" stroke="#ccc" strokeWidth="1.5" fill="none"/></svg>
          </div>
        )}
      </Link>
      <div className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-bold uppercase tracking-wide" style={{color:cat?.color||'#E2001A'}}>{cat?.label||post.category}</span>
          {post.rating && <span className="score-badge">{post.rating}/10</span>}
        </div>
        <h3 className="text-base font-bold leading-snug mb-2 mt-0">
          <Link href={`/blog/${post.slug}/`} className="text-gray-900 no-underline hover:text-brand-red transition-colors">{post.title}</Link>
        </h3>
        <p className="text-sm text-gray-500 leading-relaxed mb-3">{post.excerpt}</p>
        <div className="flex items-center justify-between text-xs text-gray-400">
          <span>{post.readingTime}</span>
          <span>{new Date(post.date).toLocaleDateString('nl-NL',{day:'numeric',month:'long',year:'numeric'})}</span>
        </div>
      </div>
    </article>
  )
}
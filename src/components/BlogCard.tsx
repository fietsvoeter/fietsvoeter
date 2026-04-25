import Link from 'next/link'
import Image from 'next/image'

export interface PostMeta {
  slug: string
  title: string
  excerpt: string
  category: string
  featuredImage?: string
  imageAlt?: string
  date?: string
  rating?: number
  contentType?: string
}

interface BlogCardProps {
  post: PostMeta
}

export function BlogCard({ post }: BlogCardProps) {
  const {
    slug,
    title,
    excerpt,
    category,
    featuredImage,
    imageAlt,
    date,
    rating,
  } = post

  return (
    <Link href={`/blog/${slug}/`} className="group block">
      <article className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-200">
        {featuredImage && (
          <div className="relative w-full h-44 overflow-hidden">
            <Image
              src={featuredImage}
              alt={imageAlt || title}
              fill
              className="object-cover transition-transform duration-200 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              loading="lazy"
            />
          </div>
        )}
        <div className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-semibold uppercase tracking-wide text-brand-red">
              {category}
            </span>
            {rating && (
              <span className="text-xs text-gray-500">{rating}/10</span>
            )}
          </div>
          <h2 className="font-bold text-gray-900 text-base leading-snug mb-2 group-hover:text-brand-red transition-colors">
            {title}
          </h2>
          <p className="text-gray-600 text-sm line-clamp-2">{excerpt}</p>
          {date && (
            <p className="text-xs text-gray-400 mt-3">{date}</p>
          )}
        </div>
      </article>
    </Link>
  )
}

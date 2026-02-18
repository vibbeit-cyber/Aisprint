import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.aisprint.in'

  // Static pages
  const staticPages = [
    '',
    '/ml-ai',
    '/prompt-engineering',
    '/ml-ai/apply',
    '/prompt-engineering/apply',
    '/courses',
    '/contact',
    '/policies/privacy',
    '/policies/terms',
    '/policies/refund',
  ]

  const staticRoutes = staticPages.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }))

  // Dynamic pages (example: fetch from database)
  // const dynamicPages = await fetchBlogPosts()
  // const dynamicRoutes = dynamicPages.map((post) => ({
  //   url: `${baseUrl}/blog/${post.slug}`,
  //   lastModified: new Date(post.updatedAt),
  //   changeFrequency: 'monthly' as const,
  //   priority: 0.6,
  // }))

  return [
    ...staticRoutes,
    // ...dynamicRoutes,
  ]
}
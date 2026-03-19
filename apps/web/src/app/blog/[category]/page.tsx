import { Metadata } from "next"
import { notFound } from "next/navigation"

import {
  getCategoryBySlug,
  getBlogsByCategory,
  getAllCategories,
} from "@/lib/blog/supabase-queries"

import BlogCard from "../components/BlogCard"
import CategoryNav from "../components/CategoryNav"

// 🔥 VERY IMPORTANT (prevents build crash)
export const dynamic = "force-dynamic"

interface PageProps {
  params: {
    category: string
  }
  searchParams?: {
    page?: string
  }
}

/* -------------------------------------------------------
   Metadata (SAFE)
------------------------------------------------------- */

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  try {
    const category = await getCategoryBySlug(params.category)

    if (!category) {
      return {
        title: "Category Not Found",
      }
    }

    return {
      title: `${category.name} | GoAI Sprint Blog`,
      description:
        category.description ||
        `Read the latest posts in ${category.name}`,
      openGraph: {
        title: `${category.name} | GoAI Sprint Blog`,
        description:
          category.description ||
          `Read the latest posts in ${category.name}`,
        type: "website",
      },
    }
  } catch (error) {
    return {
      title: "Blog Category",
      description: "Browse blog categories",
    }
  }
}

/* -------------------------------------------------------
   Disable cache
------------------------------------------------------- */

export const revalidate = 0

/* -------------------------------------------------------
   Page
------------------------------------------------------- */

export default async function CategoryPage({
  params,
  searchParams,
}: PageProps) {
  const page = Number(searchParams?.page) || 1
  const pageSize = 12

  let category: any = null
  let blogsData: any = { blogs: [], total: 0 }
  let categories: any[] = []

  try {
    const result = await Promise.all([
      getCategoryBySlug(params.category),
      getBlogsByCategory(params.category, page, pageSize),
      getAllCategories(),
    ])

    category = result[0]
    blogsData = result[1]
    categories = result[2]
  } catch (error) {
    console.error("Category page fetch failed:", error)
  }

  if (!category) {
    return notFound()
  }

  // 🔥 SAFE destructuring (prevents crash)
  const blogs = blogsData?.blogs || []
  const total = blogsData?.total || 0

  const totalPages = Math.ceil(total / pageSize)

  return (
    <div className="pt-16 min-h-screen">

      {/* Header */}
      <section className="bg-white py-16">
        <div className="container-custom max-w-6xl">

          <h1 className="section-heading mb-4">
            {category.name}
          </h1>

          {category.description && (
            <p className="section-subheading max-w-2xl">
              {category.description}
            </p>
          )}

          <div className="mt-8">
            <CategoryNav
              categories={categories}
              activeSlug={params.category}
            />
          </div>

        </div>
      </section>

      {/* Blog Grid */}
      <section className="container-custom max-w-6xl section-padding">

        {blogs.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500 font-body">
              No posts found in this category yet.
            </p>
          </div>
        ) : (
          <>
            {/* Cards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogs.map((blog: any) => (
                <BlogCard key={blog.id} {...blog} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center gap-2 mt-12">
                {Array.from(
                  { length: totalPages },
                  (_, i) => i + 1
                ).map((pageNum) => (
                  <a
                    key={pageNum}
                    href={`?page=${pageNum}`}
                    className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                      pageNum === page
                        ? "bg-brand-600 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {pageNum}
                  </a>
                ))}
              </div>
            )}
          </>
        )}

      </section>

    </div>
  )
}
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { eq, and } from "drizzle-orm";
import { cookies } from "next/headers";
import db from "@/server/db/drizzle";
import { pages } from "@/server/db/schema";

async function getPage(slug: string, preferredLanguage?: string) {
  try {
    const cookieStore = cookies();
    const language = preferredLanguage || cookieStore.get("language")?.value || "en";

    // First try to get the page in the preferred language
    let page = await db.query.pages.findFirst({
      where: and(
        eq(pages.slug, slug),
        eq(pages.language, language),
        eq(pages.status, "published")
      ),
    });

    // If not found in preferred language, fall back to English
    if (!page && language !== "en") {
      page = await db.query.pages.findFirst({
        where: and(
          eq(pages.slug, slug),
          eq(pages.language, "en"),
          eq(pages.status, "published")
        ),
      });
    }

    return page;
  } catch (error) {
    console.error("Error fetching page:", error);
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const page = await getPage(params.slug);

  if (!page) {
    return {
      title: "Page Not Found",
    };
  }

  return {
    title: `${page.title} | Mbolo`,
    description: page.metaDescription || page.title,
  };
}

export default async function DynamicPage({
  params,
}: {
  params: { slug: string };
}) {
  const page = await getPage(params.slug);

  if (!page) {
    notFound();
  }

  return (
    <div className="flex flex-col w-full min-h-screen bg-white">
      <div className="mx-auto w-full max-w-4xl px-6 py-12">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {page.title}
          </h1>
          {page.metaDescription && (
            <p className="text-lg text-gray-600">{page.metaDescription}</p>
          )}
          <div className="mt-4 text-sm text-gray-500">
            Last updated: {new Date(page.updatedAt).toLocaleDateString()}
          </div>
        </div>

        {/* Page Content */}
        <div
          className="prose prose-lg prose-emerald max-w-none
            prose-headings:font-bold prose-headings:text-gray-900
            prose-h1:text-4xl prose-h1:mb-6 prose-h1:mt-8
            prose-h2:text-3xl prose-h2:mb-4 prose-h2:mt-6
            prose-h3:text-2xl prose-h3:mb-3 prose-h3:mt-4
            prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-4
            prose-a:text-emerald-600 prose-a:no-underline hover:prose-a:underline
            prose-strong:text-gray-900 prose-strong:font-semibold
            prose-ul:list-disc prose-ul:pl-6 prose-ul:mb-4
            prose-ol:list-decimal prose-ol:pl-6 prose-ol:mb-4
            prose-li:text-gray-700 prose-li:mb-2
            prose-blockquote:border-l-4 prose-blockquote:border-emerald-500 prose-blockquote:pl-4 prose-blockquote:italic
            prose-code:bg-gray-100 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:text-sm
            prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-pre:p-4 prose-pre:rounded-lg
            prose-img:rounded-lg prose-img:shadow-lg"
          dangerouslySetInnerHTML={{ __html: page.content }}
        />

        {/* Back to Home */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <a
            href="/"
            className="inline-flex items-center text-emerald-600 hover:text-emerald-700 font-medium transition-colors"
          >
            ← Volver al Inicio
          </a>
        </div>
      </div>
    </div>
  );
}


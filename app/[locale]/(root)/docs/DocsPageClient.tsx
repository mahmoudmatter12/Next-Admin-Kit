"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { LandingNav } from "../_components/LandingNav";
import { LandingFooter } from "../_components/LandingFooter";
import { docs } from "../_components/config/docs.config";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { FileText, Loader2, AlertCircle, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface DocContent {
  content: string;
  path: string;
}

export function DocsPageClient() {
  const t = useTranslations("landing.docs");
  const [selectedDoc, setSelectedDoc] = useState<string | null>(
    docs.length > 0 ? docs[0].path : null,
  );
  const [docContent, setDocContent] = useState<DocContent | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load document content when selection changes
  useEffect(() => {
    if (!selectedDoc) return;

    const loadDoc = async () => {
      setLoading(true);
      setError(null);
      setDocContent(null);

      try {
        // Encode the path for the API route
        const encodedPath = encodeURIComponent(selectedDoc);
        const response = await fetch(`/api/docs/${encodedPath}`);

        if (!response.ok) {
          throw new Error("Failed to load document");
        }

        const data = await response.json();
        setDocContent(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to load document",
        );
      } finally {
        setLoading(false);
      }
    };

    loadDoc();
  }, [selectedDoc]);

  const selectedDocItem = docs.find((doc) => doc.path === selectedDoc);

  return (
    <div className="min-h-screen bg-setup-primary">
      <LandingNav />
      <main className="pt-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <div className="flex items-center gap-3 mb-4">
              <BookOpen className="h-8 w-8 text-setup-secondary" />
              <h1 className="text-3xl sm:text-4xl font-bold text-setup-text">
                {t("title")}
              </h1>
            </div>
            <p className="text-setup-text/70">{t("subtitle")}</p>
          </motion.div>

          {/* Two-column layout */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Left Column - Navigation */}
            <aside className="lg:col-span-1">
              <div className="bg-setup-primary border border-setup-secondary/30 rounded-lg p-4 sticky top-24">
                <h2 className="text-lg font-semibold text-setup-text mb-4">
                  {t("documents")}
                </h2>
                <nav className="space-y-2">
                  {docs.map((doc) => (
                    <button
                      key={doc.path}
                      onClick={() => setSelectedDoc(doc.path)}
                      className={cn(
                        "w-full text-left px-4 py-3 rounded-lg transition-all",
                        "hover:bg-setup-secondary/20",
                        selectedDoc === doc.path
                          ? "bg-setup-secondary/20 border-l-4 border-setup-secondary text-setup-text font-semibold"
                          : "text-setup-text/70 hover:text-setup-text",
                      )}
                    >
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 shrink-0" />
                        <div className="flex-1 min-w-0">
                          <div className="font-medium truncate">
                            {doc.title}
                          </div>
                          {doc.description && (
                            <div className="text-xs text-setup-text/60 mt-1 line-clamp-2">
                              {doc.description}
                            </div>
                          )}
                        </div>
                      </div>
                    </button>
                  ))}
                </nav>
              </div>
            </aside>

            {/* Right Column - Content */}
            <div className="lg:col-span-3">
              <div className="bg-setup-primary border border-setup-secondary/30 rounded-lg p-6 sm:p-8 min-h-[600px]">
                {loading ? (
                  <div className="flex flex-col items-center justify-center h-[600px]">
                    <Loader2 className="h-8 w-8 text-setup-secondary animate-spin mb-4" />
                    <p className="text-setup-text/70">{t("loading")}</p>
                  </div>
                ) : error ? (
                  <div className="flex flex-col items-center justify-center h-[600px]">
                    <AlertCircle className="h-8 w-8 text-red-500 mb-4" />
                    <p className="text-setup-text/70 mb-2">{t("error")}</p>
                    <p className="text-sm text-setup-text/50">{error}</p>
                  </div>
                ) : docContent && selectedDocItem ? (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="prose prose-invert max-w-none"
                  >
                    {/* Document Header */}
                    <div className="mb-8 pb-6 border-b border-setup-secondary/30">
                      <h1 className="text-3xl font-bold text-setup-text mb-2">
                        {selectedDocItem.title}
                      </h1>
                      {selectedDocItem.description && (
                        <p className="text-setup-text/70">
                          {selectedDocItem.description}
                        </p>
                      )}
                    </div>

                    {/* Markdown Content */}
                    <div className="markdown-content">
                      <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={{
                          // Customize heading styles
                          h1: ({ node, ...props }) => (
                            <h1
                              className="text-3xl font-bold text-setup-text mt-8 mb-4"
                              {...props}
                            />
                          ),
                          h2: ({ node, ...props }) => (
                            <h2
                              className="text-2xl font-semibold text-setup-text mt-6 mb-3"
                              {...props}
                            />
                          ),
                          h3: ({ node, ...props }) => (
                            <h3
                              className="text-xl font-semibold text-setup-text mt-4 mb-2"
                              {...props}
                            />
                          ),
                          // Customize code blocks
                          code: ({
                            node,
                            className,
                            children,
                            ...props
                          }: any) => {
                            const isInline = !className;
                            return isInline ? (
                              <code
                                className="bg-setup-secondary/20 text-setup-secondary px-1.5 py-0.5 rounded text-sm font-mono"
                                {...props}
                              >
                                {children}
                              </code>
                            ) : (
                              <code
                                className="block bg-black/30 text-setup-text p-4 rounded-lg overflow-x-auto text-sm font-mono"
                                {...props}
                              >
                                {children}
                              </code>
                            );
                          },
                          pre: ({ node, ...props }) => (
                            <pre
                              className="bg-black/30 rounded-lg p-4 overflow-x-auto"
                              {...props}
                            />
                          ),
                          // Customize links
                          a: ({ node, ...props }: any) => (
                            <a
                              className="text-setup-secondary hover:text-setup-secondary/80 underline"
                              target="_blank"
                              rel="noopener noreferrer"
                              {...props}
                            />
                          ),
                          // Customize lists
                          ul: ({ node, ...props }) => (
                            <ul
                              className="list-disc list-inside space-y-2 text-setup-text/80 my-4"
                              {...props}
                            />
                          ),
                          ol: ({ node, ...props }) => (
                            <ol
                              className="list-decimal list-inside space-y-2 text-setup-text/80 my-4"
                              {...props}
                            />
                          ),
                          // Customize paragraphs
                          p: ({ node, ...props }) => (
                            <p
                              className="text-setup-text/80 leading-relaxed my-4"
                              {...props}
                            />
                          ),
                          // Customize blockquotes
                          blockquote: ({ node, ...props }) => (
                            <blockquote
                              className="border-l-4 border-setup-secondary/50 pl-4 italic text-setup-text/70 my-4"
                              {...props}
                            />
                          ),
                          // Customize tables
                          table: ({ node, ...props }) => (
                            <div className="overflow-x-auto my-4">
                              <table
                                className="min-w-full border border-setup-secondary/30 rounded-lg"
                                {...props}
                              />
                            </div>
                          ),
                          th: ({ node, ...props }) => (
                            <th
                              className="border border-setup-secondary/30 px-4 py-2 bg-setup-secondary/10 text-setup-text font-semibold text-left"
                              {...props}
                            />
                          ),
                          td: ({ node, ...props }) => (
                            <td
                              className="border border-setup-secondary/30 px-4 py-2 text-setup-text/80"
                              {...props}
                            />
                          ),
                        }}
                      >
                        {docContent.content}
                      </ReactMarkdown>
                    </div>
                  </motion.div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-[600px]">
                    <FileText className="h-8 w-8 text-setup-text/50 mb-4" />
                    <p className="text-setup-text/70">{t("select_doc")}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      <LandingFooter />
    </div>
  );
}

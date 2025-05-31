"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Code, Database, Globe, Palette, Server, Terminal } from "lucide-react"
import type { NotionTool } from "@/lib/notion"

// Icon mapping
const iconMap = {
  Globe,
  Server,
  Database,
  Terminal,
  Palette,
  Code,
}

export default function Tools() {
  const [tools, setTools] = useState<NotionTool[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchTools() {
      try {
        const response = await fetch('/api/tools')
        if (!response.ok) {
          throw new Error('Failed to fetch tools')
        }
        const data = await response.json()
        setTools(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setLoading(false)
      }
    }

    fetchTools()
  }, [])

  if (loading) {
    return (
      <div className="space-y-8">
        <div className="space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Essential Tools I Use</h2>
          <p className="text-muted-foreground">These are the technologies and tools I work with on a daily basis.</p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="overflow-hidden animate-pulse">
              <CardHeader className="pb-2">
                <div className="mb-2 h-8 w-8 bg-gray-200 rounded"></div>
                <div className="h-6 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {[...Array(4)].map((_, j) => (
                    <div key={j} className="h-4 bg-gray-200 rounded"></div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="space-y-8">
        <div className="space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Essential Tools I Use</h2>
          <p className="text-muted-foreground">These are the technologies and tools I work with on a daily basis.</p>
        </div>
        <div className="text-center py-8">
          <p className="text-red-500">Error loading tools: {error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Essential Tools I Use</h2>
        <p className="text-muted-foreground">These are the technologies and tools I work with on a daily basis.</p>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {tools.map((tool) => {
          const IconComponent = iconMap[tool.icon as keyof typeof iconMap] || Code
          return (
            <Card key={tool.id} className="overflow-hidden">
              <CardHeader className="pb-2">
                <div className="mb-2">
                  <IconComponent className="h-8 w-8 text-primary" />
                </div>
                <CardTitle>{tool.title}</CardTitle>
                <CardDescription>{tool.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="list-disc pl-5 space-y-1">
                  {tool.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}


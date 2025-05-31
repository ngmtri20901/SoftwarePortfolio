"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github, Figma } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import Image from "next/image"
import type { NotionProject } from "@/lib/notion"

// Project Card Component
function ProjectCard({ project }: { project: NotionProject }) {
  return (
    <Card className="flex flex-col overflow-hidden">
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={project.image || "/placeholder.svg"}
          alt={project.title}
          fill
          className="object-cover transition-transform hover:scale-105"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = "/placeholder.svg?height=300&width=600";
          }}
        />
      </div>
      <CardHeader className="pb-2">
        <CardTitle>{project.title}</CardTitle>
        <CardDescription>{project.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag: string) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex gap-2">
        {/* Show Figma button for UI/UX projects */}
        {project.type === "uiux" && project.figmaUrl && (
          <Button asChild variant="outline" size="sm">
            <Link href={project.figmaUrl} target="_blank" rel="noopener noreferrer">
              <Figma className="mr-2 h-4 w-4" />
              Figma
            </Link>
          </Button>
        )}
        
        {/* Show GitHub button for development and testing projects */}
        {(project.type === "development" || project.type === "testing") && project.githubUrl && (
          <Button asChild variant="outline" size="sm">
            <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
              <Github className="mr-2 h-4 w-4" />
              Code
            </Link>
          </Button>
        )}
        
        {/* Demo button for all projects */}
        <Button asChild size="sm">
          <Link href={project.demoUrl} target="_blank" rel="noopener noreferrer">
            <ExternalLink className="mr-2 h-4 w-4" />
            Demo
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

export default function Projects() {
  const [activeTab, setActiveTab] = useState("uiux")
  const [projects, setProjects] = useState<NotionProject[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchProjects() {
      try {
        const response = await fetch('/api/projects')
        if (!response.ok) {
          throw new Error('Failed to fetch projects')
        }
        const data = await response.json()
        setProjects(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [])

  // Filter projects by type
  const uiuxProjects = projects.filter(p => p.type === "uiux")
  const devProjects = projects.filter(p => p.type === "development")
  const testingProjects = projects.filter(p => p.type === "testing")

  if (loading) {
    return (
      <div className="space-y-8">
        <div className="space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Projects</h2>
          <p className="text-muted-foreground">A selection of my work across different domains.</p>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="flex flex-col overflow-hidden animate-pulse">
              <div className="h-48 w-full bg-gray-200"></div>
              <CardHeader className="pb-2">
                <div className="h-6 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
              </CardHeader>
              <CardContent className="flex-grow">
                <div className="flex flex-wrap gap-2">
                  {[...Array(3)].map((_, j) => (
                    <div key={j} className="h-6 w-16 bg-gray-200 rounded"></div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex gap-2">
                <div className="h-8 w-20 bg-gray-200 rounded"></div>
                <div className="h-8 w-20 bg-gray-200 rounded"></div>
              </CardFooter>
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
          <h2 className="text-3xl font-bold tracking-tight">Projects</h2>
          <p className="text-muted-foreground">A selection of my work across different domains.</p>
        </div>
        <div className="text-center py-8">
          <p className="text-red-500">Error loading projects: {error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Projects</h2>
        <p className="text-muted-foreground">A selection of my work across different domains.</p>
      </div>

      <Tabs defaultValue="uiux" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="uiux">UI/UX & Business Analysis</TabsTrigger>
          <TabsTrigger value="development">Software Development</TabsTrigger>
          <TabsTrigger value="testing">Testing</TabsTrigger>
        </TabsList>

        <TabsContent value="uiux" className="mt-6">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {uiuxProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="development" className="mt-6">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {devProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="testing" className="mt-6">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {testingProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}


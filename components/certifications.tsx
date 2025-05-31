"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Award } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import type { NotionCertification } from "@/lib/notion"

export default function Certifications() {
  const [certifications, setCertifications] = useState<NotionCertification[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchCertifications() {
      try {
        const response = await fetch('/api/certifications')
        if (!response.ok) {
          throw new Error('Failed to fetch certifications')
        }
        const data = await response.json()
        setCertifications(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setLoading(false)
      }
    }

    fetchCertifications()
  }, [])

  if (loading) {
    return (
      <div className="space-y-8">
        <div className="space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Certifications</h2>
          <p className="text-muted-foreground">Professional qualifications and certifications I&apos;ve earned.</p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="flex flex-col h-full animate-pulse">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div className="w-12 h-12 bg-gray-200 rounded flex-shrink-0 mr-3"></div>
                  <div className="h-5 w-5 bg-gray-200 rounded flex-shrink-0"></div>
                </div>
                <div className="h-6 bg-gray-200 rounded mt-2"></div>
                <div className="space-y-1">
                  <div className="h-4 bg-gray-200 rounded"></div>
                  <div className="h-3 bg-gray-200 rounded w-20"></div>
                </div>
              </CardHeader>
              <CardContent className="flex-grow">
                <div className="h-4 bg-gray-200 rounded mb-3"></div>
                <div className="flex flex-wrap gap-1.5">
                  {[...Array(3)].map((_, j) => (
                    <div key={j} className="h-6 w-16 bg-gray-200 rounded"></div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <div className="h-8 bg-gray-200 rounded w-full"></div>
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
          <h2 className="text-3xl font-bold tracking-tight">Certifications</h2>
          <p className="text-muted-foreground">Professional qualifications and certifications I&apos;ve earned.</p>
        </div>
        <div className="text-center py-8">
          <p className="text-red-500">Error loading certifications: {error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Certifications</h2>
        <p className="text-muted-foreground">Professional qualifications and certifications I&apos;ve earned.</p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {certifications.map((cert) => (
          <Card key={cert.id} className="flex flex-col h-full">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div className="w-12 h-12 flex-shrink-0 mr-3">
                  <Image
                    src={cert.image || "/placeholder.svg"}
                    alt={`${cert.organization} logo`}
                    width={48}
                    height={48}
                    className="object-contain"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "/placeholder.svg?height=48&width=48";
                    }}
                  />
                </div>
                <Award className="h-5 w-5 text-primary flex-shrink-0" />
              </div>
              <CardTitle className="text-lg mt-2">{cert.title}</CardTitle>
              <CardDescription className="flex flex-col gap-1">
                <span>{cert.organization}</span>
                <span className="text-xs">{cert.date ? new Date(cert.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short' }) : ''}</span>
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-sm text-muted-foreground mb-3">{cert.description}</p>
              <div className="flex flex-wrap gap-1.5">
                {cert.skills.map((skill) => (
                  <Badge key={skill} variant="outline" className="text-xs">
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button asChild variant="ghost" size="sm" className="w-full">
                <Link href={cert.verifyUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Verify Certificate
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}


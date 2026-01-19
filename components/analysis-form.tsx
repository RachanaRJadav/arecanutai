"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AnalysisResult } from "./analysis-result"
import { Upload, Loader2 } from "lucide-react"

export function AnalysisForm() {
  const [image, setImage] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [analysis, setAnalysis] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setImage(event.target?.result as string)
        setAnalysis(null)
        setError(null)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleAnalyze = async () => {
    if (!image) return

    setLoading(true)
    setError(null)
    setAnalysis(null)

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image }),
      })

      if (!response.ok) {
        throw new Error("Failed to analyze image")
      }

      const data = await response.json()
      setAnalysis(data.analysis)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card className="border-emerald-200/50 dark:border-slate-700">
        <CardHeader>
          <CardTitle>Arecanut Quality Analysis</CardTitle>
          <CardDescription>
            Upload an image of arecanut to receive instant AI-powered quality assessment
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Image Upload Area */}
          <div
            className="border-2 border-dashed border-emerald-300/50 dark:border-slate-600 rounded-lg p-8 text-center cursor-pointer hover:border-emerald-400/50 transition-colors"
            onClick={() => fileInputRef.current?.click()}
          >
            <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageSelect} className="hidden" />
            {image ? (
              <div className="space-y-2">
                <img
                  src={image || "/placeholder.svg"}
                  alt="Selected arecanut"
                  className="max-w-xs max-h-64 mx-auto rounded-lg border border-emerald-200 dark:border-slate-600"
                />
                <p className="text-sm text-slate-600 dark:text-slate-400">Click to change image</p>
              </div>
            ) : (
              <div className="space-y-3">
                <Upload className="w-12 h-12 mx-auto text-emerald-500" />
                <div>
                  <p className="font-semibold text-slate-900 dark:text-white">Click to upload image</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">or drag and drop</p>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-500">PNG, JPG, GIF up to 10MB</p>
              </div>
            )}
          </div>

          {/* Analyze Button */}
          <Button
            onClick={handleAnalyze}
            disabled={!image || loading}
            className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white h-11 font-semibold"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Analyzing...
              </>
            ) : (
              "Analyze Image"
            )}
          </Button>

          {/* Error Message */}
          {error && (
            <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-900/50 rounded-lg">
              <p className="text-sm text-red-800 dark:text-red-200">{error}</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Analysis Results */}
      {analysis && <AnalysisResult analysis={analysis} />}
    </div>
  )
}

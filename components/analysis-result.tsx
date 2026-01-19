import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2, AlertCircle, TrendingUp } from "lucide-react"

interface AnalysisResultProps {
  analysis: {
    quality_score: number
    grade: string
    color_assessment: string
    size_assessment: string
    defects_found: string[]
    maturity_level: string
    recommendations: string[]
    overall_assessment: string
  }
}

export function AnalysisResult({ analysis }: AnalysisResultProps) {
  const getGradeColor = (grade: string) => {
    switch (grade.toUpperCase()) {
      case "A":
      case "PREMIUM":
        return "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-900 dark:text-emerald-200 border-emerald-300 dark:border-emerald-700"
      case "B":
      case "GOOD":
        return "bg-blue-100 dark:bg-blue-900/30 text-blue-900 dark:text-blue-200 border-blue-300 dark:border-blue-700"
      case "C":
      case "FAIR":
        return "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-900 dark:text-yellow-200 border-yellow-300 dark:border-yellow-700"
      default:
        return "bg-slate-100 dark:bg-slate-900/30 text-slate-900 dark:text-slate-200 border-slate-300 dark:border-slate-700"
    }
  }

  const scorePercentage = Math.round(analysis.quality_score * 100)

  return (
    <div className="space-y-6">
      {/* Quality Score Card */}
      <Card className="border-emerald-200/50 dark:border-slate-700 overflow-hidden">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            Quality Assessment
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">Quality Score</p>
              <p className="text-4xl font-bold text-emerald-600 dark:text-emerald-400">{scorePercentage}%</p>
            </div>
            <div className={`px-4 py-2 rounded-lg border ${getGradeColor(analysis.grade)} font-bold`}>
              Grade: {analysis.grade}
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-3 overflow-hidden">
            <div
              className="bg-gradient-to-r from-emerald-500 to-emerald-600 h-full transition-all duration-500"
              style={{ width: `${scorePercentage}%` }}
            />
          </div>
        </CardContent>
      </Card>

      {/* Assessment Details Grid */}
      <div className="grid md:grid-cols-2 gap-4">
        <Card className="border-slate-200/50 dark:border-slate-700">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Color Assessment</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-slate-700 dark:text-slate-300">{analysis.color_assessment}</p>
          </CardContent>
        </Card>

        <Card className="border-slate-200/50 dark:border-slate-700">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Size Assessment</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-slate-700 dark:text-slate-300">{analysis.size_assessment}</p>
          </CardContent>
        </Card>

        <Card className="border-slate-200/50 dark:border-slate-700">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Maturity Level</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-slate-700 dark:text-slate-300">{analysis.maturity_level}</p>
          </CardContent>
        </Card>

        <Card className="border-slate-200/50 dark:border-slate-700">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Defects Found</CardTitle>
          </CardHeader>
          <CardContent>
            {analysis.defects_found.length > 0 ? (
              <ul className="space-y-2">
                {analysis.defects_found.map((defect, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm">
                    <AlertCircle className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                    <span className="text-slate-700 dark:text-slate-300">{defect}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400">
                <CheckCircle2 className="w-4 h-4" />
                No defects detected
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Recommendations */}
      <Card className="border-blue-200/50 dark:border-slate-700 bg-blue-50/50 dark:bg-blue-900/10">
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Recommendations</CardTitle>
          <CardDescription>Guidelines for optimal handling and storage</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {analysis.recommendations.map((rec, idx) => (
              <li key={idx} className="flex items-start gap-2 text-sm">
                <span className="text-blue-600 dark:text-blue-400 font-bold mr-2">{idx + 1}.</span>
                <span className="text-slate-700 dark:text-slate-300">{rec}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Overall Assessment */}
      <Card className="border-emerald-200/50 dark:border-slate-700 bg-gradient-to-br from-emerald-50/50 to-blue-50/50 dark:from-emerald-900/10 dark:to-blue-900/10">
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Overall Assessment</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-slate-700 dark:text-slate-300 leading-relaxed">{analysis.overall_assessment}</p>
        </CardContent>
      </Card>
    </div>
  )
}
